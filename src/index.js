import api, { route } from '@forge/api';

// Hard-coded GraphQL endpoint for Talent API
//const TALENT_GRAPHQL_ENDPOINT = 'https://one-atlas-jevs.atlassian.net/gateway/api/graphql';
//const TALENT_GRAPHQL_ENDPOINT = 'https://sk-demo-site.atlassian.net/gateway/api/graphql';
const TALENT_GRAPHQL_ENDPOINT = 'https://one-atlas-dohi.atlassian.net/gateway/api/graphql';

/**
 * Create a Basic Authentication header for the Talent GraphQL API.
 * The API requires Basic Auth with email:api_token in Base64 format.
 * 
 * @param {string} email - The Atlassian account email
 * @param {string} apiToken - The Atlassian API token
 * @returns {string} The Authorization header value for Basic auth
 */
function createBasicAuthHeader(email, apiToken) {
  // Combine email and API token as "email:api_token"
  const credentials = `${email}:${apiToken}`;
  
  // Base64 encode the credentials
  const encodedCredentials = Buffer.from(credentials).toString('base64');
  
  // Return the Authorization header value
  return `Basic ${encodedCredentials}`;
}

/**
 * Query the Talent GraphQL API to retrieve organizational data for a user.
 * This function fetches the user's position, manager, direct reports, and peers.
 * 
 * @param {string} userEmail - The email address of the user to query
 * @param {string} cloudId - The Atlassian cloud ID
 * @param {string> authEmail - The email address for Basic Auth
 * @param {string} apiToken - The API token for Basic Auth
 * @returns {Promise<Object>} The user's position data and organizational relationships
 */
async function queryTalentGraphQL(userEmail, cloudId, authEmail, apiToken) {
  const query = `
    query positionsSearchQuery($cloudId: ID!, $fieldIdIsIn: [ID!], $first: Int = 100, $rql: String) {
      radar_positionsSearch(
        first: $first
        cloudId: $cloudId
        rql: $rql
      ) @optIn(to: ["RadarPositionsSearch"]) {
        totalCount
        edges {
          node {
            id
            fieldValues(fieldIdIsIn: $fieldIdIsIn) {
              fieldId
              fieldValue {
                ... on RadarStringFieldValue {
                  stringValue: value
                }
                ... on RadarAriFieldValue {
                  value {
                    ... on RadarWorker {
                      id
                      preferredName
                    }
                    ... on TeamV2 {
                      id
                      displayName
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  
  const variables = {
    cloudId: cloudId,
    fieldIdIsIn: ["workerEmail", "positionWorker", "positionReportingLine"],
    first: 100,
    rql: `workerEmail = '${userEmail}'`
  };
  
  try {
    console.log('DEBUG: Making GraphQL request to:', TALENT_GRAPHQL_ENDPOINT);
    console.log('DEBUG: GraphQL variables:', JSON.stringify(variables, null, 2));
    
    // Create Basic Auth header with email and API token
    const authHeader = createBasicAuthHeader(authEmail, apiToken);
    
    // Use fetch API which is available in Forge Node.js resolvers
    // to make HTTP requests to external APIs
    const response = await fetch(TALENT_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: JSON.stringify({
        query: query,
        variables: variables
      })
    });
    
    console.log('DEBUG: GraphQL response status:', response.status);
    const responseText = await response.text();
    console.log('DEBUG: GraphQL response raw text (first 500 chars):', responseText.substring(0, 500));
    
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      const errorMsg = `GraphQL API returned non-JSON response (status ${response.status}): ${responseText.substring(0, 200)}`;
      console.error('ERROR:', errorMsg);
      throw new Error(errorMsg);
    }
    
    console.log('DEBUG: GraphQL response data:', JSON.stringify(data, null, 2));
    
    if (data.errors) {
      const errorMsg = `GraphQL error: ${JSON.stringify(data.errors)}`;
      console.error('ERROR:', errorMsg);
      throw new Error(errorMsg);
    }
    
    // Validate that data.data exists before returning
    if (!data.data) {
      const errorMsg = 'GraphQL response does not contain a data property';
      console.error('ERROR:', errorMsg);
      console.error('ERROR: Response structure:', JSON.stringify(data, null, 2));
      throw new Error(errorMsg);
    }
    
    return data.data;
  } catch (error) {
    const errorMsg = `Failed to query Talent GraphQL API: ${error.message}`;
    console.error('ERROR:', errorMsg);
    console.error('ERROR: Full stack trace:', error.stack);
    throw new Error(errorMsg);
  }
}

/**
 * Fetch manager details for a list of position UUIDs.
 * This function queries the Talent GraphQL API to get the names of managers in the hierarchy.
 * 
 * @param {Array} managerUUIDs - Array of manager position UUIDs
 * @param {string} cloudId - The Atlassian cloud ID
 * @param {string} authEmail - The email address for Basic Auth
 * @param {string} apiToken - The API token for Basic Auth
 * @returns {Promise<Array>} Array of manager objects with uuid and preferredName
 */
async function fetchManagerDetails(managerUUIDs, cloudId, authEmail, apiToken) {
  if (!managerUUIDs || managerUUIDs.length === 0) {
    return [];
  }
  
  const managers = [];
  
  // Fetch details for each manager UUID
  for (const uuid of managerUUIDs) {
    try {
      console.log('DEBUG: Fetching manager details for UUID:', uuid);
      
      const managerQuery = `
        query positionsSearchQuery($cloudId: ID!, $fieldIdIsIn: [ID!], $first: Int = 100, $rql: String) {
          radar_positionsSearch(
            first: $first
            cloudId: $cloudId
            rql: $rql
          ) @optIn(to: ["RadarPositionsSearch"]) {
            edges {
              node {
                fieldValues(fieldIdIsIn: $fieldIdIsIn) {
                  fieldId
                  fieldValue {
                    ... on RadarAriFieldValue {
                      value {
                        ... on RadarWorker {
                          preferredName
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `;
      
      const variables = {
        cloudId: cloudId,
        fieldIdIsIn: ["positionWorker"],
        first: 100,
        rql: `id = '${uuid}'`
      };
      
      const authHeader = createBasicAuthHeader(authEmail, apiToken);
      
      const response = await fetch(TALENT_GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader
        },
        body: JSON.stringify({
          query: managerQuery,
          variables: variables
        })
      });
      
      const responseText = await response.text();
      const data = JSON.parse(responseText);
      
      if (data.errors) {
        console.warn('WARNING: Error fetching manager', uuid, ':', JSON.stringify(data.errors));
        managers.push({ uuid, preferredName: 'Unknown Manager' });
      } else if (data.data?.radar_positionsSearch?.edges && data.data.radar_positionsSearch.edges.length > 0) {
        const edge = data.data.radar_positionsSearch.edges[0];
        let managerName = 'Unknown Manager';
        
        if (edge.node.fieldValues) {
          const workerField = edge.node.fieldValues.find(f => f.fieldId === 'positionWorker');
          if (workerField?.fieldValue?.value?.preferredName) {
            managerName = workerField.fieldValue.value.preferredName;
          }
        }
        
        console.log('DEBUG: Found manager name:', managerName, 'for UUID:', uuid);
        managers.push({ uuid, preferredName: managerName });
      } else {
        managers.push({ uuid, preferredName: 'Unknown Manager' });
      }
    } catch (error) {
      console.error('ERROR: Error fetching manager details for', uuid, ':', error.message);
      managers.push({ uuid, preferredName: 'Unknown Manager' });
    }
  }
  
  return managers;
}

/**
 * Build an ASCII text visualization of the organizational tree.
 * Shows the user's reporting line (managers), direct reports, and peers in a tree format.
 * 
 * @param {string} userName - The name of the user
 * @param {Array} managerHierarchy - Array of manager objects with preferredName, from direct manager to top-level
 * @param {Array} directReports - Array of direct report objects with preferredName
 * @param {Array} peers - Array of peer objects with preferredName
 * @returns {string} Formatted ASCII tree visualization
 */
function buildOrgTreeVisualization(userName, managerHierarchy, directReports, peers) {
  let tree = '';
  
  // Display the user
  tree += `${userName}\n`;
  
  // Display reporting line (managers) if exists
  if (managerHierarchy && managerHierarchy.length > 0) {
    // Reverse the hierarchy so direct manager appears first
    const reversedHierarchy = [...managerHierarchy].reverse();
    tree += `├── Reporting Line (Managers, up to ${reversedHierarchy.length} levels):\n`;
    reversedHierarchy.forEach((manager, index) => {
      const isLast = index === reversedHierarchy.length - 1;
      const levelIndicator = index === 0 ? 'Direct Manager' : `Level ${index + 1}`;
      const prefix = isLast ? '│   └──' : '│   ├──';
      tree += `${prefix} ${manager.preferredName} (${levelIndicator})\n`;
    });
  } else {
    tree += `├── Reporting Line: None\n`;
  }
  
  // Display direct reports
  if (directReports && directReports.length > 0) {
    tree += `├── Direct Reports (${directReports.length}):\n`;
    directReports.forEach((report, index) => {
      const isLast = index === directReports.length - 1;
      const prefix = isLast ? '│   └──' : '│   ├──';
      const displayText = report.email ? `${report.preferredName} (${report.email})` : report.preferredName;
      tree += `${prefix} ${displayText}\n`;
    });
  } else {
    tree += `├── Direct Reports: None\n`;
  }
  
  // Display peers
  if (peers && peers.length > 0) {
    tree += `└── Peers (${peers.length}):\n`;
    peers.forEach((peer, index) => {
      const isLast = index === peers.length - 1;
      const prefix = isLast ? '    └──' : '    ├──';
      const displayText = peer.email ? `${peer.preferredName} (${peer.email})` : peer.preferredName;
      tree += `${prefix} ${displayText}\n`;
    });
  } else {
    tree += `└── Peers: None\n`;
  }
  
  return tree;
}

/**
 * Main function to retrieve the organizational tree for a user from Talent.
 * This function is called by the Rovo agent when the user requests organizational data.
 * 
 * @param {Object} request - The request object containing user email
 * @returns {Promise<Object>} Response with the organizational tree visualization
 */
export async function getOrgTree(request) {
  // Log immediately, even if an error occurs during parsing
  console.error('=== DEBUG: getOrgTree CALLED ===');
  console.log('📥 Received payload:', JSON.stringify(request, null, 2));
  
  try {
    console.log('DEBUG: getOrgTree function called');
    console.log('DEBUG: Request object:', JSON.stringify(request, null, 2));
    
    // Retrieve the API token and email from environment variables
    // These should be set as Forge variables during deployment
    const apiToken = process.env.TALENT_API_TOKEN;
    const authEmail = process.env.TALENT_AUTH_EMAIL;
    
    console.log('DEBUG: API token present:', !!apiToken);
    console.log('DEBUG: Auth email present:', !!authEmail);
    
    if (apiToken) {
      console.log('DEBUG: API token first 20 chars:', apiToken.substring(0, 20));
    }
    if (authEmail) {
      console.log('DEBUG: Auth email:', authEmail);
    }
    
    if (!apiToken) {
      console.error('ERROR: TALENT_API_TOKEN environment variable not set');
      return {
        type: 'error',
        message: 'TALENT_API_TOKEN environment variable is not configured. Please set this variable in your deployment configuration.'
      };
    }
    
    if (!authEmail) {
      console.error('ERROR: TALENT_AUTH_EMAIL environment variable not set');
      return {
        type: 'error',
        message: 'TALENT_AUTH_EMAIL environment variable is not configured. Please set this variable in your deployment configuration.'
      };
    }
    
    // Extract user email from the request
    // The structure from Rovo actions has userEmail directly on the request object
    const userEmail = request?.userEmail;
    console.log('DEBUG: User email provided:', userEmail);
    
    if (!userEmail) {
      console.error('ERROR: No user email provided in request');
      return {
        type: 'error',
        message: 'User email is required.'
      };
    }
    
    // Get the current cloud ID from the context
    const cloudId = request?.context?.cloudId;
    console.log('DEBUG: Cloud ID:', cloudId);
    
    if (!cloudId) {
      console.error('ERROR: Cloud ID not found in request');
      return {
        type: 'error',
        message: 'Cloud ID is required.'
      };
    }
    
    // Query for the user's position and manager information
    console.log('DEBUG: Querying Talent GraphQL API for user position data');
    const userPositionData = await queryTalentGraphQL(userEmail, cloudId, authEmail, apiToken);
    console.log('DEBUG: User position data received:', JSON.stringify(userPositionData, null, 2));
    
    // Validate that userPositionData and radar_positionsSearch exist
    if (!userPositionData || !userPositionData.radar_positionsSearch) {
      console.error('ERROR: Invalid response structure from Talent GraphQL API');
      console.error('ERROR: userPositionData:', userPositionData);
      return {
        type: 'error',
        message: 'Invalid response received from Talent GraphQL API. The API may be temporarily unavailable.'
      };
    }
    
    if (!userPositionData.radar_positionsSearch.edges || userPositionData.radar_positionsSearch.edges.length === 0) {
      console.error('ERROR: User not found in Talent system:', userEmail);
      return {
        type: 'error',
        message: `User with email ${userEmail} not found in Talent system.`
      };
    }
    
    // Extract user information from the position data
    const userPosition = userPositionData.radar_positionsSearch.edges[0].node;
    const userPositionId = userPosition.id;
    
    // Extract just the UUID from the position ARN (last part after the final slash)
    // ARN format: ari:cloud:radar:...:position/.../.../uuid
    const userPositionUUID = userPositionId.split('/').pop();
    console.log('DEBUG: User position UUID:', userPositionUUID);
    
    // Extract field values
    let userName = userEmail;
    let reportingLineString = null;
    let managerHierarchy = [];
    
    if (userPosition.fieldValues) {
      userPosition.fieldValues.forEach(field => {
        if (field.fieldId === 'positionWorker' && field.fieldValue?.value?.preferredName) {
          userName = field.fieldValue.value.preferredName;
        }
        if (field.fieldId === 'positionReportingLine' && field.fieldValue?.stringValue) {
          reportingLineString = field.fieldValue.stringValue;
        }
      });
    }
    
    console.log('DEBUG: Reporting line string:', reportingLineString);
    
    // Parse the reporting line to get manager position UUIDs
    // Format is: uuid1.uuid2.uuid3... (dot-separated, from direct manager to top-level manager)
    if (reportingLineString) {
      const managerUUIDs = reportingLineString.split('.');
      console.log('DEBUG: Manager UUIDs in hierarchy:', managerUUIDs);
      
      // Create a list to fetch manager details for each UUID
      managerHierarchy = managerUUIDs
        .filter(uuid => uuid && uuid.trim())
        .map(uuid => ({ uuid: uuid.trim(), preferredName: null }));
      
      console.log('DEBUG: Manager hierarchy to fetch:', managerHierarchy.length, 'managers');
    }
    
    // Query for direct reports
    let directReports = [];
    const directReportsQuery = `
      query positionsSearchQuery($cloudId: ID!, $fieldIdIsIn: [ID!], $first: Int = 100, $rql: String) {
        radar_positionsSearch(
          first: $first
          cloudId: $cloudId
          rql: $rql
        ) @optIn(to: ["RadarPositionsSearch"]) {
          edges {
            node {
              fieldValues(fieldIdIsIn: $fieldIdIsIn) {
                fieldId
                fieldValue {
                  ... on RadarStringFieldValue {
                    stringValue: value
                  }
                  ... on RadarAriFieldValue {
                    value {
                      ... on RadarWorker {
                        id
                        preferredName
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;
    
    const directReportsVariables = {
      cloudId: cloudId,
      fieldIdIsIn: ["workerEmail", "positionWorker"],
      first: 100,
      rql: `manager = '${userPositionUUID}'`
    };
    
    try {
      console.log('DEBUG: Querying direct reports for position UUID:', userPositionUUID);
      
      // Create Basic Auth header for the request
      const authHeader = createBasicAuthHeader(authEmail, apiToken);
      
      // Use fetch API to make HTTP requests to the Talent GraphQL API
      const directReportsResponse = await fetch(TALENT_GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader
        },
        body: JSON.stringify({
          query: directReportsQuery,
          variables: directReportsVariables
        })
      });
      
      console.log('DEBUG: Direct reports response status:', directReportsResponse.status);
      const directReportsText = await directReportsResponse.text();
      console.log('DEBUG: Direct reports response raw text (first 500 chars):', directReportsText.substring(0, 500));
      
      let directReportsData;
      try {
        directReportsData = JSON.parse(directReportsText);
      } catch (parseError) {
        const errorMsg = `Direct reports API returned non-JSON response (status ${directReportsResponse.status}): ${directReportsText.substring(0, 200)}`;
        console.error('ERROR:', errorMsg);
        throw new Error(errorMsg);
      }
      
      console.log('DEBUG: Direct reports data received:', JSON.stringify(directReportsData, null, 2));
      
      // Check for GraphQL errors in the response
      if (directReportsData.errors) {
        console.warn('WARNING: GraphQL errors in direct reports query:', JSON.stringify(directReportsData.errors));
        console.warn('WARNING: Continuing without direct reports due to API error');
        // Continue without direct reports instead of throwing
      } else if (directReportsData.data?.radar_positionsSearch?.edges) {
        directReports = directReportsData.data.radar_positionsSearch.edges
          .map(edge => {
            let reportName = 'Unknown';
            if (edge.node.fieldValues) {
              const workerField = edge.node.fieldValues.find(f => f.fieldId === 'positionWorker');
              if (workerField?.fieldValue?.value?.preferredName) {
                reportName = workerField.fieldValue.value.preferredName;
              }
            }
            return { preferredName: reportName };
          });
        console.log('DEBUG: Found', directReports.length, 'direct reports');
      }
    } catch (error) {
      console.error('ERROR: Error fetching direct reports:', error.message);
      console.error('ERROR: Full stack trace:', error.stack);
      // Continue without direct reports
    }
    
    // Fetch manager names for the reporting line hierarchy
    let populatedManagerHierarchy = [];
    if (managerHierarchy.length > 0) {
      try {
        const managerUUIDs = managerHierarchy.map(m => m.uuid);
        console.log('DEBUG: Fetching details for managers:', managerUUIDs);
        populatedManagerHierarchy = await fetchManagerDetails(managerUUIDs, cloudId, authEmail, apiToken);
        console.log('DEBUG: Populated manager hierarchy:', JSON.stringify(populatedManagerHierarchy, null, 2));
      } catch (error) {
        console.error('ERROR: Error fetching manager details:', error.message);
        // Continue with empty manager hierarchy
      }
    }
    
    // Query for peers (people who report to the same direct manager as the user)
    let peers = [];
    if (reportingLineString) {
      // Extract the direct manager's UUID from the reporting line
      // The reporting line contains position UUIDs in order from direct manager to top-level manager
      // The LAST UUID in the dot-separated string is the DIRECT MANAGER's position UUID
      const positionUUIDs = reportingLineString.split('.');
      console.log('DEBUG: Position UUIDs in reporting line:', positionUUIDs);
      const directManagerPositionUUID = positionUUIDs[positionUUIDs.length - 1];
      console.log('DEBUG: Direct manager position UUID:', directManagerPositionUUID);
      
      const peersQuery = `
        query positionsSearchQuery($cloudId: ID!, $fieldIdIsIn: [ID!], $first: Int = 100, $rql: String) {
          radar_positionsSearch(
            first: $first
            cloudId: $cloudId
            rql: $rql
          ) @optIn(to: ["RadarPositionsSearch"]) {
            edges {
              node {
                fieldValues(fieldIdIsIn: $fieldIdIsIn) {
                  fieldId
                  fieldValue {
                    ... on RadarStringFieldValue {
                      stringValue: value
                    }
                    ... on RadarAriFieldValue {
                      value {
                        ... on RadarWorker {
                          id
                          preferredName
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `;
      
      // directManagerPositionUUID was already calculated earlier from positionUUIDs
      
      const peersVariables = {
        cloudId: cloudId,
        fieldIdIsIn: ["workerEmail", "positionWorker"],
        first: 100,
        rql: `manager = '${directManagerPositionUUID}'`
      };
      
      try {
        console.log('DEBUG: Querying peers for direct manager UUID:', directManagerPositionUUID);
        
        // Create Basic Auth header for the request
        const authHeader = createBasicAuthHeader(authEmail, apiToken);
        
        // Use fetch API to make HTTP requests to the Talent GraphQL API
        const peersResponse = await fetch(TALENT_GRAPHQL_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader
          },
          body: JSON.stringify({
            query: peersQuery,
            variables: peersVariables
          })
        });
        
        console.log('DEBUG: Peers response status:', peersResponse.status);
        const peersText = await peersResponse.text();
        console.log('DEBUG: Peers response raw text (first 500 chars):', peersText.substring(0, 500));
        
        let peersData;
        try {
          peersData = JSON.parse(peersText);
        } catch (parseError) {
          const errorMsg = `Peers API returned non-JSON response (status ${peersResponse.status}): ${peersText.substring(0, 200)}`;
          console.error('ERROR:', errorMsg);
          throw new Error(errorMsg);
        }
        
        console.log('DEBUG: Peers data received:', JSON.stringify(peersData, null, 2));
        
        // Check for GraphQL errors in the response
        if (peersData.errors) {
          console.warn('WARNING: GraphQL errors in peers query:', JSON.stringify(peersData.errors));
          console.warn('WARNING: Continuing without peers due to API error');
          // Continue without peers instead of throwing
        } else if (peersData.data?.radar_positionsSearch?.edges) {
          peers = peersData.data.radar_positionsSearch.edges
            .map(edge => {
              let peerName = 'Unknown';
              let peerEmail = null;
              if (edge.node.fieldValues) {
                const workerField = edge.node.fieldValues.find(f => f.fieldId === 'positionWorker');
                if (workerField?.fieldValue?.value?.preferredName) {
                  peerName = workerField.fieldValue.value.preferredName;
                }
                const emailField = edge.node.fieldValues.find(f => f.fieldId === 'workerEmail');
                if (emailField?.fieldValue?.stringValue) {
                  peerEmail = emailField.fieldValue.stringValue;
                }
              }
              return { preferredName: peerName, email: peerEmail };
            })
            // Filter out the user themselves from peers (compare by email for accuracy)
            .filter(peer => peer.email !== userEmail && peer.preferredName !== userName);
          console.log('DEBUG: Found', peers.length, 'peers');
        }
      } catch (error) {
        console.error('ERROR: Error fetching peers:', error.message);
        console.error('ERROR: Full stack trace:', error.stack);
        // Continue without peers
      }
    }
    
    // Build the organizational tree visualization
    console.log('DEBUG: Building organizational tree visualization');
    const orgTree = buildOrgTreeVisualization(userName, populatedManagerHierarchy, directReports, peers);
    console.log('DEBUG: Organizational tree built successfully');
    console.log('DEBUG: Returning success response with tree visualization');
    
    return {
      type: 'success',
      output: orgTree
    };
  } catch (error) {
    console.error('ERROR: Caught error in getOrgTree function:', error.message);
    console.error('ERROR: Full error stack:', error.stack);
    const errorMessage = error.message || 'An unexpected error occurred while fetching organizational data.';
    console.error('ERROR: Returning error response to user:', errorMessage);
    return {
      type: 'error',
      message: errorMessage
    };
  }
}

/**
 * Main function to retrieve detailed position information for a user from Talent.
 * This function retrieves position details such as job family, level, job title, role, position title, and key.
 * 
 * @param {Object} request - The request object containing user email
 * @returns {Promise<Object>} Response with the position details
 */
export async function getPositionDetails(request) {
  console.log('DEBUG: getPositionDetails function called');
  console.log('📥 Received payload:', JSON.stringify(request, null, 2));
  
  try {
    // Retrieve the API token and email from environment variables
    const apiToken = process.env.TALENT_API_TOKEN;
    const authEmail = process.env.TALENT_AUTH_EMAIL;
    
    if (!apiToken || !authEmail) {
      return {
        type: 'error',
        message: 'API credentials are not configured. Please contact your administrator.'
      };
    }
    
    // Extract user email from the request
    const userEmail = request?.userEmail;
    
    if (!userEmail) {
      return {
        type: 'error',
        message: 'User email is required.'
      };
    }
    
    // Get the current cloud ID from the context
    const cloudId = request?.context?.cloudId;
    
    if (!cloudId) {
      return {
        type: 'error',
        message: 'Cloud ID is required.'
      };
    }
    
    console.log('DEBUG: Querying position details for user:', userEmail);
    
    // Query for the position details
    const query = `
      query positionsSearchQuery($cloudId: ID!, $fieldIdIsIn: [ID!], $first: Int = 100, $rql: String) {
        radar_positionsSearch(
          first: $first
          cloudId: $cloudId
          rql: $rql
        ) @optIn(to: ["RadarPositionsSearch"]) {
          totalCount
          edges {
            node {
              id
              fieldValues(fieldIdIsIn: $fieldIdIsIn) {
                fieldId
                fieldValue {
                  ... on RadarStringFieldValue {
                    stringValue: value
                  }
                  ... on RadarAriFieldValue {
                    value {
                      ... on RadarWorker {
                        id
                        preferredName
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;
    
    const variables = {
      cloudId: cloudId,
      fieldIdIsIn: ["workerEmail", "positionWorker", "positionJobFamily", "positionLevel", "positionJobTitle", "positionRole", "positionPositionTitle", "positionKey"],
      first: 100,
      rql: `workerEmail = '${userEmail}'`
    };
    
    const authHeader = createBasicAuthHeader(authEmail, apiToken);
    
    const response = await fetch(TALENT_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: JSON.stringify({
        query: query,
        variables: variables
      })
    });
    
    const responseText = await response.text();
    const data = JSON.parse(responseText);
    
    if (data.errors) {
      throw new Error(`GraphQL error: ${JSON.stringify(data.errors)}`);
    }
    
    if (!data.data?.radar_positionsSearch?.edges || data.data.radar_positionsSearch.edges.length === 0) {
      return {
        type: 'error',
        message: `User with email ${userEmail} not found in the system.`
      };
    }
    
    // Extract position information
    const position = data.data.radar_positionsSearch.edges[0].node;
    let positionDetails = {};
    let userName = userEmail;
    
    // Define field display names
    const fieldDisplayNames = {
      'positionWorker': 'Worker',
      'positionJobFamily': 'Job Family',
      'positionLevel': 'Level',
      'positionJobTitle': 'Job Title',
      'positionRole': 'Role',
      'positionPositionTitle': 'Position Title',
      'positionKey': 'Key'
    };
    
    // Extract field values
    if (position.fieldValues) {
      position.fieldValues.forEach(field => {
        const displayName = fieldDisplayNames[field.fieldId];
        
        if (field.fieldId === 'positionWorker' && field.fieldValue?.value?.preferredName) {
          userName = field.fieldValue.value.preferredName;
          positionDetails[displayName] = field.fieldValue.value.preferredName;
        } else if (field.fieldId !== 'positionWorker' && field.fieldValue?.stringValue) {
          // For string values
          positionDetails[displayName] = field.fieldValue.stringValue;
        }
      });
    }
    
    // Build the response message
    let message = `Position Details for ${userName} (${userEmail}):\n\n`;
    
    Object.entries(positionDetails).forEach(([displayName, value]) => {
      if (value) {
        message += `${displayName}: ${value}\n`;
      }
    });
    
    console.log('DEBUG: Position details retrieved successfully');
    
    return {
      type: 'success',
      output: message
    };
  } catch (error) {
    console.error('ERROR: Caught error in getPositionDetails function:', error.message);
    console.error('ERROR: Full error stack:', error.stack);
    return {
      type: 'error',
      message: error.message || 'An unexpected error occurred while fetching position details.'
    };
  }
}

/**
 * Main function to retrieve all details (org tree + position information) for a user.
 * This function combines organizational structure and position details in a comprehensive, well-formatted output.
 * 
 * @param {Object} request - The request object containing user email
 * @returns {Promise<Object>} Response with all user details
 */
export async function getAllUserDetails(request) {
  console.log('DEBUG: getAllUserDetails function called');
  console.log('📥 Received payload:', JSON.stringify(request, null, 2));
  
  try {
    // Retrieve the API token and email from environment variables
    const apiToken = process.env.TALENT_API_TOKEN;
    const authEmail = process.env.TALENT_AUTH_EMAIL;
    
    if (!apiToken || !authEmail) {
      return {
        type: 'error',
        message: 'API credentials are not configured. Please contact your administrator.'
      };
    }
    
    // Extract user email from the request
    const userEmail = request?.userEmail;
    
    if (!userEmail) {
      return {
        type: 'error',
        message: 'User email is required.'
      };
    }
    
    // Get the current cloud ID from the context
    const cloudId = request?.context?.cloudId;
    
    if (!cloudId) {
      return {
        type: 'error',
        message: 'Cloud ID is required.'
      };
    }
    
    console.log('DEBUG: Querying all details for user:', userEmail);
    
    // Query for all position details including reporting line
    const query = `
      query positionsSearchQuery($cloudId: ID!, $fieldIdIsIn: [ID!], $first: Int = 100, $rql: String) {
        radar_positionsSearch(
          first: $first
          cloudId: $cloudId
          rql: $rql
        ) @optIn(to: ["RadarPositionsSearch"]) {
          totalCount
          edges {
            node {
              id
              fieldValues(fieldIdIsIn: $fieldIdIsIn) {
                fieldId
                fieldValue {
                  ... on RadarStringFieldValue {
                    stringValue: value
                  }
                  ... on RadarAriFieldValue {
                    value {
                      ... on RadarWorker {
                        id
                        preferredName
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;
    
    const variables = {
      cloudId: cloudId,
      fieldIdIsIn: ["workerEmail", "positionWorker", "positionReportingLine", "positionJobFamily", "positionLevel", "positionJobTitle", "positionRole", "positionPositionTitle", "positionKey"],
      first: 100,
      rql: `workerEmail = '${userEmail}'`
    };
    
    const authHeader = createBasicAuthHeader(authEmail, apiToken);
    
    const response = await fetch(TALENT_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: JSON.stringify({
        query: query,
        variables: variables
      })
    });
    
    const responseText = await response.text();
    const data = JSON.parse(responseText);
    
    if (data.errors) {
      throw new Error(`GraphQL error: ${JSON.stringify(data.errors)}`);
    }
    
    if (!data.data?.radar_positionsSearch?.edges || data.data.radar_positionsSearch.edges.length === 0) {
      return {
        type: 'error',
        message: `User with email ${userEmail} not found in the system.`
      };
    }
    
    // Extract position information
    const position = data.data.radar_positionsSearch.edges[0].node;
    const userPositionId = position.id;
    const userPositionUUID = userPositionId.split('/').pop();
    
    let userName = userEmail;
    let reportingLineString = null;
    let managerHierarchy = [];
    let positionDetails = {};
    
    // Define field display names
    const fieldDisplayNames = {
      'positionWorker': 'Worker',
      'positionJobFamily': 'Job Family',
      'positionLevel': 'Level',
      'positionJobTitle': 'Job Title',
      'positionRole': 'Role',
      'positionPositionTitle': 'Position Title',
      'positionKey': 'Key'
    };
    
    // Extract field values
    if (position.fieldValues) {
      position.fieldValues.forEach(field => {
        const displayName = fieldDisplayNames[field.fieldId];
        
        if (field.fieldId === 'positionWorker' && field.fieldValue?.value?.preferredName) {
          userName = field.fieldValue.value.preferredName;
          positionDetails[displayName] = field.fieldValue.value.preferredName;
        } else if (field.fieldId === 'positionReportingLine' && field.fieldValue?.stringValue) {
          reportingLineString = field.fieldValue.stringValue;
        } else if (field.fieldId !== 'positionWorker' && field.fieldValue?.stringValue) {
          positionDetails[displayName] = field.fieldValue.stringValue;
        }
      });
    }
    
    // Parse the reporting line to get manager position UUIDs
    if (reportingLineString) {
      const positionUUIDs = reportingLineString.split('.');
      managerHierarchy = positionUUIDs
        .filter(uuid => uuid && uuid.trim())
        .map(uuid => ({ uuid: uuid.trim(), preferredName: null }));
    }
    
    // Fetch manager names
    let populatedManagerHierarchy = [];
    if (managerHierarchy.length > 0) {
      try {
        const managerUUIDs = managerHierarchy.map(m => m.uuid);
        populatedManagerHierarchy = await fetchManagerDetails(managerUUIDs, cloudId, authEmail, apiToken);
      } catch (error) {
        console.error('ERROR: Error fetching manager details:', error.message);
      }
    }
    
    // Query for direct reports
    let directReports = [];
    const directReportsQuery = `
      query positionsSearchQuery($cloudId: ID!, $fieldIdIsIn: [ID!], $first: Int = 100, $rql: String) {
        radar_positionsSearch(
          first: $first
          cloudId: $cloudId
          rql: $rql
        ) @optIn(to: ["RadarPositionsSearch"]) {
          edges {
            node {
              fieldValues(fieldIdIsIn: $fieldIdIsIn) {
                fieldId
                fieldValue {
                  ... on RadarAriFieldValue {
                    value {
                      ... on RadarWorker {
                        id
                        preferredName
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;
    
    const directReportsVariables = {
      cloudId: cloudId,
      fieldIdIsIn: ["workerEmail", "positionWorker"],
      first: 100,
      rql: `manager = '${userPositionUUID}'`
    };
    
    try {
      const authHeaderDR = createBasicAuthHeader(authEmail, apiToken);
      const directReportsResponse = await fetch(TALENT_GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeaderDR
        },
        body: JSON.stringify({
          query: directReportsQuery,
          variables: directReportsVariables
        })
      });
      
      const directReportsText = await directReportsResponse.text();
      const directReportsData = JSON.parse(directReportsText);
      
      if (!directReportsData.errors && directReportsData.data?.radar_positionsSearch?.edges) {
        directReports = directReportsData.data.radar_positionsSearch.edges
          .map(edge => {
            let reportName = 'Unknown';
            let reportEmail = null;
            if (edge.node.fieldValues) {
              const workerField = edge.node.fieldValues.find(f => f.fieldId === 'positionWorker');
              if (workerField?.fieldValue?.value?.preferredName) {
                reportName = workerField.fieldValue.value.preferredName;
              }
              const emailField = edge.node.fieldValues.find(f => f.fieldId === 'workerEmail');
              if (emailField?.fieldValue?.stringValue) {
                reportEmail = emailField.fieldValue.stringValue;
              }
            }
            return { preferredName: reportName, email: reportEmail };
          });
      }
    } catch (error) {
      console.error('ERROR: Error fetching direct reports:', error.message);
    }
    
    // Query for peers
    let peers = [];
    if (reportingLineString) {
      const positionUUIDs = reportingLineString.split('.');
      const directManagerPositionUUID = positionUUIDs[positionUUIDs.length - 1];
      
      const peersQuery = `
        query positionsSearchQuery($cloudId: ID!, $fieldIdIsIn: [ID!], $first: Int = 100, $rql: String) {
          radar_positionsSearch(
            first: $first
            cloudId: $cloudId
            rql: $rql
          ) @optIn(to: ["RadarPositionsSearch"]) {
            edges {
              node {
                fieldValues(fieldIdIsIn: $fieldIdIsIn) {
                  fieldId
                  fieldValue {
                    ... on RadarStringFieldValue {
                      stringValue: value
                    }
                    ... on RadarAriFieldValue {
                      value {
                        ... on RadarWorker {
                          id
                          preferredName
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `;
      
      // directManagerPositionUUID was already calculated from the first positionUUIDs split
      
      const peersVariables = {
        cloudId: cloudId,
        fieldIdIsIn: ["workerEmail", "positionWorker"],
        first: 100,
        rql: `manager = '${directManagerPositionUUID}'`
      };
      
      try {
        const authHeaderPeers = createBasicAuthHeader(authEmail, apiToken);
        const peersResponse = await fetch(TALENT_GRAPHQL_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeaderPeers
          },
          body: JSON.stringify({
            query: peersQuery,
            variables: peersVariables
          })
        });
        
        const peersText = await peersResponse.text();
        const peersData = JSON.parse(peersText);
        
        if (!peersData.errors && peersData.data?.radar_positionsSearch?.edges) {
          peers = peersData.data.radar_positionsSearch.edges
            .map(edge => {
              let peerName = 'Unknown';
              let peerEmail = null;
              if (edge.node.fieldValues) {
                const workerField = edge.node.fieldValues.find(f => f.fieldId === 'positionWorker');
                if (workerField?.fieldValue?.value?.preferredName) {
                  peerName = workerField.fieldValue.value.preferredName;
                }
                const emailField = edge.node.fieldValues.find(f => f.fieldId === 'workerEmail');
                if (emailField?.fieldValue?.stringValue) {
                  peerEmail = emailField.fieldValue.stringValue;
                }
              }
              return { preferredName: peerName, email: peerEmail };
            })
            .filter(peer => peer.email !== userEmail && peer.preferredName !== userName);
        }
      } catch (error) {
        console.error('ERROR: Error fetching peers:', error.message);
      }
    }
    
    // Build comprehensive output
    let message = `╔════════════════════════════════════════════╗\n`;
    message += `║ COMPLETE USER DETAILS\n`;
    message += `╚════════════════════════════════════════════╝\n\n`;
    
    // User and Position Information
    message += `👤 USER INFORMATION\n`;
    message += `─────────────────────────────────────────\n`;
    message += `Name: ${userName}\n`;
    message += `Email: ${userEmail}\n`;
    message += `\n`;
    
    // Position Details
    message += `💼 POSITION DETAILS\n`;
    message += `─────────────────────────────────────────\n`;
    Object.entries(positionDetails).forEach(([displayName, value]) => {
      if (value && displayName !== 'Worker') {
        message += `${displayName}: ${value}\n`;
      }
    });
    message += `\n`;
    
    // Reporting Line
    message += `🔗 REPORTING LINE\n`;
    message += `─────────────────────────────────────────\n`;
    if (populatedManagerHierarchy && populatedManagerHierarchy.length > 0) {
      // Reverse the hierarchy so direct manager appears first
      const reversedHierarchy = [...populatedManagerHierarchy].reverse();
      reversedHierarchy.forEach((manager, index) => {
        const levelLabel = index === 0 ? 'Direct Manager' : `Level ${index + 1}`;
        message += `${index + 1}. ${manager.preferredName} (${levelLabel})\n`;
      });
    } else {
      message += `No managers found\n`;
    }
    message += `\n`;
    
    // Direct Reports
    message += `📊 DIRECT REPORTS (${directReports.length})\n`;
    message += `─────────────────────────────────────────\n`;
    if (directReports.length > 0) {
      directReports.forEach((report, index) => {
        const displayText = report.email ? `${report.preferredName} (${report.email})` : report.preferredName;
        message += `${index + 1}. ${displayText}\n`;
      });
    } else {
      message += `None\n`;
    }
    message += `\n`;
    
    // Peers
    message += `👥 PEERS (${peers.length})\n`;
    message += `─────────────────────────────────────────\n`;
    if (peers.length > 0) {
      peers.forEach((peer, index) => {
        const displayText = peer.email ? `${peer.preferredName} (${peer.email})` : peer.preferredName;
        message += `${index + 1}. ${displayText}\n`;
      });
    } else {
      message += `None\n`;
    }
    
    console.log('DEBUG: All user details retrieved successfully');
    
    return {
      type: 'success',
      output: message
    };
  } catch (error) {
    console.error('ERROR: Caught error in getAllUserDetails function:', error.message);
    console.error('ERROR: Full error stack:', error.stack);
    return {
      type: 'error',
      message: error.message || 'An unexpected error occurred while fetching user details.'
    };
  }
}

/**
 * Retrieves collaborators for a user filtered by relationship type.
 * This function calls getOrgTree internally and filters results by the specified relationship.
 * 
 * @param {Object} request - The request object containing userEmail, relationship, and limit
 * @returns {Promise<Object>} Response with filtered collaborators
 */
export async function getCollaborators(request) {
  console.log('DEBUG: getCollaborators function called');
  console.log('📥 Received payload:', JSON.stringify(request, null, 2));
  
  try {
    // Extract parameters from the request
    const userEmail = request?.userEmail;
    const relationship = request?.relationship?.toLowerCase();
    const limit = request?.limit;
    
    // Validate required parameters
    if (!userEmail) {
      return {
        type: 'error',
        message: 'User email is required.'
      };
    }
    
    if (!relationship) {
      return {
        type: 'error',
        message: 'Relationship type is required. Valid values: manager, direct_reports, peers'
      };
    }
    
    if (limit === undefined || limit === null || limit < 1) {
      return {
        type: 'error',
        message: 'Result limit must be a positive number.'
      };
    }
    
    // Validate relationship type
    const validRelationships = ['manager', 'direct_reports', 'peers'];
    if (!validRelationships.includes(relationship)) {
      return {
        type: 'error',
        message: `Invalid relationship type: ${relationship}. Valid values: ${validRelationships.join(', ')}`
      };
    }
    
    console.log(`DEBUG: Getting collaborators for ${userEmail} with relationship: ${relationship}, limit: ${limit}`);
    
    // Call getOrgTree to get the organizational structure
    const orgTreeResult = await getOrgTree(request);
    
    if (orgTreeResult.type === 'error') {
      return orgTreeResult;
    }
    
    // Extract collaborators based on relationship type
    let collaborators = [];
    
    if (relationship === 'manager') {
      // For manager relationship, retrieve the reporting line hierarchy
      const apiToken = process.env.TALENT_API_TOKEN;
      const authEmail = process.env.TALENT_AUTH_EMAIL;
      const cloudId = request?.context?.cloudId;
      
      if (!apiToken || !authEmail || !cloudId) {
        return {
          type: 'error',
          message: 'Required credentials or context not available.'
        };
      }
      
      // Query for user position and reporting line
      const query = `
        query positionsSearchQuery($cloudId: ID!, $fieldIdIsIn: [ID!], $first: Int = 100, $rql: String) {
          radar_positionsSearch(
            first: $first
            cloudId: $cloudId
            rql: $rql
          ) @optIn(to: ["RadarPositionsSearch"]) {
            edges {
              node {
                id
                fieldValues(fieldIdIsIn: $fieldIdIsIn) {
                  fieldId
                  fieldValue {
                    ... on RadarStringFieldValue {
                      stringValue: value
                    }
                  }
                }
              }
            }
          }
        }
      `;
      
      const variables = {
        cloudId: cloudId,
        fieldIdIsIn: ["positionReportingLine"],
        first: 100,
        rql: `workerEmail = '${userEmail}'`
      };
      
      const authHeader = createBasicAuthHeader(authEmail, apiToken);
      
      const response = await fetch(TALENT_GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader
        },
        body: JSON.stringify({
          query: query,
          variables: variables
        })
      });
      
      const responseText = await response.text();
      const data = JSON.parse(responseText);
      
      if (data.errors || !data.data?.radar_positionsSearch?.edges || data.data.radar_positionsSearch.edges.length === 0) {
        return {
          type: 'error',
          message: `User with email ${userEmail} not found in the system.`
        };
      }
      
      // Extract reporting line
      const position = data.data.radar_positionsSearch.edges[0].node;
      let reportingLineString = null;
      
      if (position.fieldValues) {
        position.fieldValues.forEach(field => {
          if (field.fieldId === 'positionReportingLine' && field.fieldValue?.stringValue) {
            reportingLineString = field.fieldValue.stringValue;
          }
        });
      }
      
      // Parse reporting line and fetch manager details
      if (reportingLineString) {
        const positionUUIDs = reportingLineString.split('.');
        
        // Reverse the array so we start from the direct manager (first element after reverse)
        // and go up the chain to top-level manager
        const reversedUUIDs = positionUUIDs.reverse();
        
        // Take only the first 'limit' managers from the reversed list
        const managerUUIDs = reversedUUIDs
          .filter(uuid => uuid && uuid.trim())
          .slice(0, limit)
          .map(uuid => ({ uuid: uuid.trim() }));
        
        // Fetch manager details with position titles
        try {
          collaborators = await fetchManagerDetailsWithPositionTitle(managerUUIDs, cloudId, authEmail, apiToken);
        } catch (error) {
          console.error('ERROR: Error fetching manager details:', error.message);
          return {
            type: 'error',
            message: 'Failed to retrieve manager information.'
          };
        }
      }
    } else {
      // For direct_reports and peers, we need to query the API directly
      const apiToken = process.env.TALENT_API_TOKEN;
      const authEmail = process.env.TALENT_AUTH_EMAIL;
      const cloudId = request?.context?.cloudId;
      
      if (!apiToken || !authEmail || !cloudId) {
        return {
          type: 'error',
          message: 'Required credentials or context not available.'
        };
      }
      
      if (relationship === 'direct_reports') {
        collaborators = await getCollaboratorsList(userEmail, 'direct_reports', cloudId, authEmail, apiToken);
      } else if (relationship === 'peers') {
        collaborators = await getCollaboratorsList(userEmail, 'peers', cloudId, authEmail, apiToken);
      }
    }
    
    // Limit the results
    const limitedCollaborators = collaborators.slice(0, limit);
    
    // Format the output
    if (limitedCollaborators.length === 0) {
      const relationshipLabel = formatRelationshipLabel(relationship);
      return {
        type: 'success',
        output: `No ${relationshipLabel.toLowerCase()} found.`
      };
    }
    
    let message = '';
    limitedCollaborators.forEach((collaborator, index) => {
      const relationshipLabel = formatRelationshipLabel(relationship, index);
      const line = `${collaborator.name}, ${collaborator.positionTitle || 'N/A'}, ${relationshipLabel}`;
      message += line;
      if (index < limitedCollaborators.length - 1) {
        message += '\n';
      }
    });
    
    console.log('DEBUG: Collaborators retrieved successfully');
    
    return {
      type: 'success',
      output: message
    };
  } catch (error) {
    console.error('ERROR: Caught error in getCollaborators function:', error.message);
    console.error('ERROR: Full error stack:', error.stack);
    return {
      type: 'error',
      message: error.message || 'An unexpected error occurred while fetching collaborators.'
    };
  }
}

/**
 * Helper function to fetch manager details including position title.
 */
async function fetchManagerDetailsWithPositionTitle(managerUUIDs, cloudId, authEmail, apiToken) {
  const managers = [];
  
  for (const managerData of managerUUIDs) {
    try {
      const uuid = managerData.uuid;
      const query = `
        query positionsSearchQuery($cloudId: ID!, $fieldIdIsIn: [ID!], $first: Int = 100, $rql: String) {
          radar_positionsSearch(
            first: $first
            cloudId: $cloudId
            rql: $rql
          ) @optIn(to: ["RadarPositionsSearch"]) {
            edges {
              node {
                fieldValues(fieldIdIsIn: $fieldIdIsIn) {
                  fieldId
                  fieldValue {
                    ... on RadarStringFieldValue {
                      stringValue: value
                    }
                    ... on RadarAriFieldValue {
                      value {
                        ... on RadarWorker {
                          preferredName
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `;
      
      const variables = {
        cloudId: cloudId,
        fieldIdIsIn: ["positionWorker", "positionPositionTitle"],
        first: 100,
        rql: `id = '${uuid}'`
      };
      
      const authHeader = createBasicAuthHeader(authEmail, apiToken);
      const response = await fetch(TALENT_GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader
        },
        body: JSON.stringify({
          query: query,
          variables: variables
        })
      });
      
      const responseText = await response.text();
      const data = JSON.parse(responseText);
      
      if (data.data?.radar_positionsSearch?.edges && data.data.radar_positionsSearch.edges.length > 0) {
        const edge = data.data.radar_positionsSearch.edges[0];
        let managerName = 'Unknown';
        let positionTitle = null;
        
        if (edge.node.fieldValues) {
          const workerField = edge.node.fieldValues.find(f => f.fieldId === 'positionWorker');
          if (workerField?.fieldValue?.value?.preferredName) {
            managerName = workerField.fieldValue.value.preferredName;
          }
          const titleField = edge.node.fieldValues.find(f => f.fieldId === 'positionPositionTitle');
          if (titleField?.fieldValue?.stringValue) {
            positionTitle = titleField.fieldValue.stringValue;
          }
        }
        
        managers.push({ 
          name: managerName, 
          positionTitle: positionTitle,
          relationship: 'Manager'
        });
      }
    } catch (error) {
      console.error('ERROR: Error fetching manager details for UUID', managerData.uuid, ':', error.message);
    }
  }
  
  return managers;
}

/**
 * Helper function to retrieve collaborators list (direct reports or peers) with position titles.
 */
async function getCollaboratorsList(userEmail, relationshipType, cloudId, authEmail, apiToken) {
  const collaborators = [];
  
  try {
    // First, get the user's position information
    const userQuery = `
      query positionsSearchQuery($cloudId: ID!, $fieldIdIsIn: [ID!], $first: Int = 100, $rql: String) {
        radar_positionsSearch(
          first: $first
          cloudId: $cloudId
          rql: $rql
        ) @optIn(to: ["RadarPositionsSearch"]) {
          edges {
            node {
              id
              fieldValues(fieldIdIsIn: $fieldIdIsIn) {
                fieldId
                fieldValue {
                  ... on RadarStringFieldValue {
                    stringValue: value
                  }
                }
              }
            }
          }
        }
      }
    `;
    
    const userVariables = {
      cloudId: cloudId,
      fieldIdIsIn: ["positionReportingLine"],
      first: 100,
      rql: `workerEmail = '${userEmail}'`
    };
    
    const authHeader = createBasicAuthHeader(authEmail, apiToken);
    const userResponse = await fetch(TALENT_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: JSON.stringify({
        query: userQuery,
        variables: userVariables
      })
    });
    
    const userResponseText = await userResponse.text();
    const userData = JSON.parse(userResponseText);
    
    if (!userData.data?.radar_positionsSearch?.edges || userData.data.radar_positionsSearch.edges.length === 0) {
      return collaborators;
    }
    
    const userPosition = userData.data.radar_positionsSearch.edges[0].node;
    const userPositionId = userPosition.id;
    const userPositionUUID = userPositionId.split('/').pop();
    let reportingLineString = null;
    
    if (userPosition.fieldValues) {
      userPosition.fieldValues.forEach(field => {
        if (field.fieldId === 'positionReportingLine' && field.fieldValue?.stringValue) {
          reportingLineString = field.fieldValue.stringValue;
        }
      });
    }
    
    let searchRQL = '';
    
    if (relationshipType === 'direct_reports') {
      // Search for people whose manager is the current user
      searchRQL = `manager = '${userPositionUUID}'`;
    } else if (relationshipType === 'peers') {
      // Search for people whose manager is the current user's manager
      if (reportingLineString) {
        const positionUUIDs = reportingLineString.split('.');
        const directManagerUUID = positionUUIDs[positionUUIDs.length - 1];
        searchRQL = `manager = '${directManagerUUID}'`;
      } else {
        return collaborators;
      }
    }
    
    // Query for collaborators
    const collaboratorsQuery = `
      query positionsSearchQuery($cloudId: ID!, $fieldIdIsIn: [ID!], $first: Int = 100, $rql: String) {
        radar_positionsSearch(
          first: $first
          cloudId: $cloudId
          rql: $rql
        ) @optIn(to: ["RadarPositionsSearch"]) {
          edges {
            node {
              fieldValues(fieldIdIsIn: $fieldIdIsIn) {
                fieldId
                fieldValue {
                  ... on RadarStringFieldValue {
                    stringValue: value
                  }
                  ... on RadarAriFieldValue {
                    value {
                      ... on RadarWorker {
                        id
                        preferredName
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;
    
    const collaboratorsVariables = {
      cloudId: cloudId,
      fieldIdIsIn: ["workerEmail", "positionWorker", "positionPositionTitle"],
      first: 100,
      rql: searchRQL
    };
    
    const collaboratorsResponse = await fetch(TALENT_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: JSON.stringify({
        query: collaboratorsQuery,
        variables: collaboratorsVariables
      })
    });
    
    const collaboratorsResponseText = await collaboratorsResponse.text();
    const collaboratorsData = JSON.parse(collaboratorsResponseText);
    
    if (collaboratorsData.data?.radar_positionsSearch?.edges) {
      collaboratorsData.data.radar_positionsSearch.edges.forEach(edge => {
        let name = 'Unknown';
        let positionTitle = null;
        let email = null;
        
        if (edge.node.fieldValues) {
          const workerField = edge.node.fieldValues.find(f => f.fieldId === 'positionWorker');
          if (workerField?.fieldValue?.value?.preferredName) {
            name = workerField.fieldValue.value.preferredName;
          }
          
          const titleField = edge.node.fieldValues.find(f => f.fieldId === 'positionPositionTitle');
          if (titleField?.fieldValue?.stringValue) {
            positionTitle = titleField.fieldValue.stringValue;
          }
          
          const emailField = edge.node.fieldValues.find(f => f.fieldId === 'workerEmail');
          if (emailField?.fieldValue?.stringValue) {
            email = emailField.fieldValue.stringValue;
          }
        }
        
        // For peers, filter out the user themselves
        if (relationshipType === 'peers' && email === userEmail) {
          return;
        }
        
        collaborators.push({
          name: name,
          positionTitle: positionTitle,
          email: email
        });
      });
    }
  } catch (error) {
    console.error(`ERROR: Error fetching ${relationshipType}:`, error.message);
  }
  
  return collaborators;
}

/**
 * Helper function to format relationship label.
 * For managers, appends +N to indicate the level (Manager, Manager+1, Manager+2, etc.)
 */
function formatRelationshipLabel(relationship, index = 0) {
  if (relationship === 'manager') {
    if (index === 0) {
      return 'Manager';
    } else {
      return `Manager+${index}`;
    }
  }
  
  const labels = {
    'direct_reports': 'Direct Report',
    'peers': 'Peer'
  };
  return labels[relationship] || relationship;
}
