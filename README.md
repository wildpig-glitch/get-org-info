# Get Org Info - Atlassian Forge App

A Rovo Agent Forge app for retrieving comprehensive organizational information from the Talent GraphQL API. The app provides detailed insights into user hierarchies, position details, and organizational relationships — and works on any Atlassian site where the Radar/Talent service is activated.

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

 - get the organizational tree for a user
 - show me all the details for a user
 - find collaborators for a user

## Architecture

### Technology Stack
- **Framework**: Atlassian Forge
- **Runtime**: Node.js 24.x
- **API**: Talent GraphQL API (`radar_positionsSearch`)
- **Authentication**: Basic Authentication (email + API token) — required as this API does not support OAuth
- **UI Kit**: Rovo Agent with action handlers

### Key Components

#### Authentication
Uses Basic Authentication with Atlassian API tokens. Credentials are stored as encrypted Forge environment variables:
- `TALENT_API_TOKEN`: Atlassian API token
- `TALENT_AUTH_EMAIL`: Email address associated with the API token

#### GraphQL Endpoint
The endpoint is resolved **dynamically at runtime** from the site the app is installed on — no hardcoded URLs or fallbacks:

```
https://<installed-site>.atlassian.net/gateway/api/graphql
```

This is achieved by calling `/rest/api/2/serverInfo` via `api.asApp().requestJira()` to retrieve the site's base URL.

#### Egress Configuration
The `manifest.yml` uses a wildcard to allow outbound requests to any Atlassian site:
```yaml
permissions:
  external:
    fetch:
      backend:
        - address: https://*.atlassian.net
```

#### Main Functions
1. `getOrgTree(request)` - Retrieves organizational tree
2. `getPositionDetails(request)` - Retrieves position details
3. `getAllUserDetails(request)` - Retrieves all user details
4. `getCollaborators(request)` - Filters and retrieves collaborators
5. `getSiteBaseUrl()` - Dynamically resolves the installed site URL via Jira serverInfo
6. `createBasicAuthHeader(email, apiToken)` - Creates Basic Auth header
7. `queryTalentGraphQL(query, variables, authHeader, endpoint)` - Core GraphQL query executor
8. `fetchManagerDetails(...)` - Fetches manager information
9. `fetchManagerDetailsWithPositionTitle(...)` - Fetches managers with position titles
10. `getCollaboratorsList(...)` - Helper for collaborators query
11. `buildOrgTreeVisualization(...)` - Creates ASCII tree visualization

## Installation & Setup

### Prerequisites
- Atlassian Forge CLI
- Node.js 24.x or later
- A valid Atlassian cloud site with the **Radar/Talent service activated**
- An Atlassian API token with access to organizational data

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

3. **Set Forge environment variables** (required for authentication):
   ```bash
   forge variables set --environment development TALENT_API_TOKEN <your-api-token>
   forge variables set --environment development TALENT_AUTH_EMAIL <your-email>
   ```

4. **Deploy the app**:
   ```bash
   forge deploy --non-interactive -e development
   ```

5. **Install on your Jira site**:
   ```bash
   forge install --non-interactive --site <your-site-url> --product jira --environment development
   ```

   > **Note**: No changes to `manifest.yml` or `src/index.js` are needed when deploying to a new site. The app automatically targets the site it is installed on.

### Deploying to Additional Sites

To install the app on another site, simply run the install command for that site. The app dynamically resolves the endpoint at runtime:

```bash
forge install --non-interactive --site <another-site-url> --product jira --environment development
```

If the site already has the app installed and you've changed scopes, use `--upgrade`:

```bash
forge install --non-interactive --upgrade --site <another-site-url> --product jira --environment development
```

> **Important**: The Radar/Talent GraphQL API (`radar_positionsSearch`) must be activated on the target Atlassian site. This is an internal Atlassian platform service and not available on all sites.

## Configuration

### Manifest Configuration
The `manifest.yml` file contains:
- **Scopes**: `write:jira-work`, `read:jira-work`, `read:chat:rovo`
- **Egress**: `https://*.atlassian.net` (wildcard — covers any Atlassian site)
- **Runtime**: Node.js 24.x with 256MB memory on ARM64 architecture

### Required Forge Variables

| Variable | Description |
|---|---|
| `TALENT_API_TOKEN` | Atlassian API token for Basic Auth |
| `TALENT_AUTH_EMAIL` | Email address associated with the API token |

Set these for each environment you deploy to:
```bash
forge variables set --environment <environment> TALENT_API_TOKEN <token>
forge variables set --environment <environment> TALENT_AUTH_EMAIL <email>
```

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

#### Dynamic Site Resolution
The app uses `getSiteBaseUrl()` to call `/rest/api/2/serverInfo` via `api.asApp().requestJira()`. This returns the `baseUrl` of the installed site, which is used to construct the GraphQL endpoint. This eliminates any hardcoded URLs or fallback logic.

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
   - Verify `TALENT_API_TOKEN` is valid and not expired
   - Check that `TALENT_AUTH_EMAIL` matches the token owner
   - Ensure the token has appropriate scopes

2. **403 Field not available for OAuth**
   - The Talent API does not support OAuth — ensure you are using Basic Auth via the Forge environment variables, not `api.asApp().requestGraph()`

3. **Cannot route request / radar service not found**
   - The Radar/Talent service is not activated on the target site
   - Contact your Atlassian administrator to have it enabled

4. **No results found**
   - The user may not exist in the Talent system
   - The user may not have organizational data configured
   - Check that the user email is correct

5. **GraphQL errors**
   - Verify field IDs are correct
   - Check RQL query syntax
   - Ensure the cloud ID in the request context is valid

### Debugging
Check app logs using:
```bash
forge logs -e development --since 15m
```

## Performance Considerations

- Direct reports and peers queries use first-level filtering (not recursive)
- Manager hierarchy is fetched sequentially for accuracy
- Results are limited by user-specified limits to reduce API calls
- Queries are optimized to retrieve only necessary fields
- One extra API call is made per action invocation to resolve the site base URL via `serverInfo`

## Security

- API tokens are stored as encrypted Forge environment variables
- Basic Auth headers are created dynamically per request and never logged
- No credentials are exposed in logs or responses
- All API calls use HTTPS
- Egress is scoped to `*.atlassian.net` only
- Scopes are minimal and limited to required functionality

## Support & Documentation

For more information about:
- **Atlassian Forge**: https://developer.atlassian.com/cloud/forge/
- **Talent GraphQL API**: https://developer.atlassian.com/platform/atlassian-graphql-api/graphql/#overview
- **Rovo Agent**: https://developer.atlassian.com/cloud/rovo/

## Changelog

### Version 1.1.0
- Dynamically resolve GraphQL endpoint from installed site via `serverInfo` API — no hardcoded URLs or fallbacks
- Replace three hardcoded egress URLs with `https://*.atlassian.net` wildcard
- Fix `TALENT_GRAPHQL_ENDPOINT` ReferenceError in `getAllUserDetails`, `getCollaborators`, `fetchManagerDetailsWithPositionTitle`, `getCollaboratorsList`
- Revert `requestGraph` usage (Talent API does not support OAuth)

### Version 1.0.0
- Initial release
- Four core functions for org data retrieval
- Full organizational tree visualization
- Collaborators filtering with relationship types
- Comprehensive position details
- Full organizational information view
