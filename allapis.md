# All APIs used in this project

Base URL: https://react-api-script.onrender.com

Summary of endpoints, HTTP method, query params / body and where used.

- **GET /continental/campaign**
  - Query params: `start_date`, `end_date`, `platform`, optional `brand_name`
  - Used in: src/assets/components/functional/performanceOverview/campaignsComponent.jsx
  - Notes: fetched via `cachedFetch` (GET) and cached in localStorage

- **GET /continental/campaign_graph**
  - Query params: `start_date`, `end_date`, `platform`, `campaign_id`, optional `brand_name`
  - Used in: src/assets/components/functional/performanceOverview/campaignsComponent.jsx
  - Notes: used to show campaign trend modal (GET via `cachedFetch`)

- **PUT /continental/play-pause**
  - Body (JSON): `{ platform, campaign_id, status }`
  - Used in: src/assets/components/functional/performanceOverview/campaignsComponent.jsx
  - Notes: toggles campaign active/stop state

- **GET /continental/wallet_balance**
  - Query params: `platform`
  - Used in: src/Navbar.jsx
  - Notes: fetched via `cachedAxiosGet`

- **GET /csrfToken/**
  - Used in: src/assets/services/authUtils.jsx
  - Notes: used to obtain CSRF token before login POST

- **POST /login/**
  - Body: CSRF token fields + `username`, `password`
  - Used in: src/assets/services/authUtils.jsx

- **POST /app/register/**
  - Body: `first_name`, `last_name`, `username`, `password`, `confirm_password`
  - Used in: src/assets/services/authUtils.jsx

- **POST /bowlers/login**
  - Body: `username`, `password`
  - Used in: src/assets/pages/auth/login.jsx
  - Notes: returns `{ token: { access }, username }` which is saved to `localStorage` as `accessToken`

- **GET /bowlers/keyword-search-term-page**
  - Query params: e.g. `start_date`, `end_date`, `platform`, other paging params
  - Used in: src/assets/components/functional/searchTermInsights/searchTermInsightsDatatable.jsx

- **GET /rules_engine/metadata/campaigns/**
  - Query params: `brand_id`, `platform`
  - Used in: src/assets/components/functional/smartControl/addRuleCreator.jsx

- **GET /rules_engine/metadata/campaigns/{campaignId}/**
  - Query params: `brand_id`, `platform`
  - Used in: src/assets/components/functional/smartControl/addRuleCreator.jsx

- **POST /rules_engine/rules**
  - Body: rule payload (see `addRuleCreator.jsx` for fields)
  - Used in: src/assets/components/functional/smartControl/addRuleCreator.jsx

- **GET /continental/product-analytics**
  - Query params: `platform`, `start_date`, `end_date`
  - Used in: src/assets/components/functional/productAnalytics/productAnalyticsDatatable.jsx

- **GET /continental/adgroups**
  - Query params: `start_date`, `end_date`, `platform`
  - Used in: src/assets/components/functional/performanceOverview/adGroupsComponent.jsx

- **PUT /continental/toggle_ad_group**
  - Query params: `campaign_type`, `ad_group_id`, `platform`, `campaign_id`
  - Used in: src/assets/components/functional/performanceOverview/adGroupsComponent.jsx

- **PUT /bowlers/update_ad_group_name**
  - Query params: `platform`, `ad_group_id`, `campaign_type`, `campaign_id`, `new_name`
  - Used in: src/assets/components/functional/performanceOverview/adGroupsComponent.jsx (commented-out edit flow)

- **GET /continental/displayrules**
  - Query params: `platform`
  - Used in: src/assets/components/functional/smartControl/smartControlDatatable.jsx

- **PUT /continental/play-pause-rule**
  - Query params: `rule_id`, `platform`
  - Used in: src/assets/components/functional/smartControl/smartControlDatatable.jsx

- **DELETE /continental/delete-rule**
  - Query params: `rule_id`, `platform`
  - Used in: src/assets/components/functional/smartControl/smartControlDatatable.jsx

- **GET /continental/history**
  - Query params: `platform`
  - Used in: src/assets/components/functional/history/historyDatatable.jsx


Notes:
- The project primarily calls the single backend host `https://react-api-script.onrender.com`.
- Cached GETs are implemented using `src/services/cachedFetch.js` and `src/services/cachedAxios.js`.
- If you want this exported as JSON or integrated into an automated API catalogue, tell me which format you prefer.

-- End of file
