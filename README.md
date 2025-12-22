# Get Org Info - Atlassian Forge App

A powerful Atlassian Forge application for retrieving and displaying comprehensive organizational information from the Talent GraphQL API. This app integrates seamlessly with Jira and provides detailed insights into user hierarchies, position details, and organizational relationships.

## Features

### 1. Get Organizational Tree (`getOrgTree`)
Retrieves the complete organizational structure for a specified user, including:
- **Reporting Line**: Full manager hierarchy from direct manager to top-level executive
- **Direct Reports**: All first-level direct reports with names and emails
- **Peers**: Colleagues reporting to the same direct manager with names and emails

**Output Format**: ASCII tree visualization

### 2. Get Position Details (`getPositionDetails`)
Retrieves detailed position information for a user:
- Job Family
- Level
- Job Title
- Role
- Position Title
- Position Key

**Output Format**: Formatted list of position attributes

### 3. Get All User Details (`getAllUserDetails`)
Comprehensive view combining organizational structure and position information:
- User Information (name, email)
- Position Details (all attributes)
- Reporting Line (with titles and hierarchy levels)
- Direct Reports (with counts)
- Peers (with counts)

**Output Format**: Well-structured, organized sections with Unicode box drawing

### 4. Get Collaborators (`getCollaborators`)
Find collaborators filtered by relationship type with configurable result limits:
- **Parameters**:
  - `userEmail`: Email address of the user
  - `relationship`: Type of relationship to filter ("manager", "direct_reports", or "peers")
  - `limit`: Maximum number of results to return

- **Manager Relationship Labels**:
  - "Manager" - Direct manager
  - "Manager+1" - Manager's manager
  - "Manager+2" - Manager's manager's manager
  - And so on...

**Output Format**: Simple list format `[Name], [Position Title], [Relationship]`

## Conversation Starters

The app supports the following Rovo agent conversation starters:

- "get the organizational tree for a user"
- "what is the org structure for a user"
- "show me the org tree for a user"
- "get position details for a user"
- "what is the job title for a user"
- "show me position information for a user"
- "show me all the details for a user"
- "find collaborators for a user"
- "get my peers and managers and direct reports"

## Architecture

### Technology Stack
- **Framework**: Atlassian Forge
- **Runtime**: Node.js 24.x
- **API**: Talent GraphQL API
- **Authentication**: Basic Authentication (email + API token)
- **UI Kit**: Rovo Agent with action handlers

### Key Components

#### Authentication
- Uses Basic Authentication with Atlassian API tokens
- Credentials stored as Forge variables:
  - `TALENT_API_TOKEN`: Atlassian API token
  - `TALENT_AUTH_EMAIL`: Email for authentication

#### GraphQL Endpoint
```
https://one-atlas-jevs.atlassian.net/gateway/api/graphql
```

#### Main Functions
1. `getOrgTree(request)` - Retrieves organizational tree
2. `getPositionDetails(request)` - Retrieves position details
3. `getAllUserDetails(request)` - Retrieves all user details
4. `getCollaborators(request)` - Filters and retrieves collaborators
5. `queryTalentGraphQL(...)` - Core GraphQL query executor
6. `fetchManagerDetails(...)` - Fetches manager information
7. `fetchManagerDetailsWithPositionTitle(...)` - Fetches managers with position titles
8. `getCollaboratorsList(...)` - Helper for collaborators query
9. `buildOrgTreeVisualization(...)` - Creates ASCII tree visualization

## Installation & Setup

### Prerequisites
- Atlassian Forge CLI
- Node.js 24.x or later
- Valid Atlassian cloud site
- Talent GraphQL API access

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/wildpig-glitch/get-org-info.git
   cd get-org-info
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set Forge variables**:
   ```bash
   forge variables set TALENT_API_TOKEN <your-api-token>
   forge variables set TALENT_AUTH_EMAIL <your-email>
   ```

4. **Deploy the app**:
   ```bash
   forge deploy --non-interactive -e development
   ```

5. **Install on your Jira site**:
   ```bash
   forge install --non-interactive --upgrade --site <your-site-url> --product jira --environment development
   ```

## Configuration

### Manifest Configuration
The `manifest.yml` file contains:
- **Scopes**: `write:jira-work`, `read:jira-work`, `read:chat:rovo`
- **Egress**: Allows external calls to `https://one-atlas-jevs.atlassian.net`
- **Runtime**: Node.js 24.x with 256MB memory on ARM64 architecture

### Required Permissions
Users must have permission to access:
- Jira issues (for context)
- Talent organizational data (via API token)

## Development

### Project Structure
```
get-org-info/
├── src/
│   └── index.js          # Main app code with all functions
├── manifest.yml          # Forge app configuration
├── package.json          # Dependencies
├── package-lock.json     # Dependency lock file
└── README.md            # This file
```

### Key Concepts

#### Reporting Line
The `positionReportingLine` field contains a dot-separated string of position UUIDs:
- First UUID: Direct manager's position
- Subsequent UUIDs: Manager hierarchy up the chain
- Example: `uuid1.uuid2.uuid3`

#### Manager vs Direct Reports vs Peers
- **Manager**: The person(s) to whom the user reports
- **Direct Reports**: People who report directly to the user
- **Peers**: People who report to the same manager as the user

## API Integration

### GraphQL Query Pattern
All queries follow this pattern:
```graphql
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
```

### Supported Field IDs
- `workerEmail` - User email address
- `positionWorker` - Worker information
- `positionReportingLine` - Manager hierarchy
- `positionJobFamily` - Job family
- `positionLevel` - Position level
- `positionJobTitle` - Job title
- `positionRole` - Role description
- `positionPositionTitle` - Position title
- `positionKey` - Position key/ID

## Troubleshooting

### Common Issues

1. **401 Unauthorized Error**
   - Verify API token is valid
   - Check that token has appropriate scopes
   - Ensure email in TALENT_AUTH_EMAIL matches token owner

2. **No results found**
   - User may not exist in Talent system
   - User may not have organizational data configured
   - Check user email is correct

3. **GraphQL errors**
   - Verify field IDs are correct
   - Check RQL query syntax
   - Ensure cloud ID is valid

### Debugging
Enable debug logs using:
```bash
forge logs -e development --since 10m
```

## Performance Considerations

- Direct reports and peers queries use first-level filtering (not recursive)
- Manager hierarchy is fetched sequentially for accuracy
- Results are limited by user-specified limits to reduce API calls
- Queries are optimized to retrieve only necessary fields

## Security

- API tokens are stored as encrypted Forge variables
- Basic Auth headers are created dynamically per request
- No credentials are logged or exposed
- All API calls use HTTPS
- Scopes are minimal and limited to required functionality

## Support & Documentation

For more information about:
- **Atlassian Forge**: https://developer.atlassian.com/cloud/forge/
- **Talent GraphQL API**: Contact Atlassian support
- **Rovo Agent**: https://developer.atlassian.com/cloud/rovo/

## License

This project is provided as-is for use with Atlassian Forge and Jira.

## Author

Created for organizational data retrieval and collaboration management within Jira.

## Changelog

### Version 1.0.0
- Initial release
- Four core functions for org data retrieval
- Full organizational tree visualization
- Collaborators filtering with relationship types
- Comprehensive position details
- Full organizational information view
