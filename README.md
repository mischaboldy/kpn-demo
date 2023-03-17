# kpn-demo

## Build Setup

Before running, copy the `.env.template` file into a `.env` file and fill in the values with the following content:

```
API_BASE_URL=http://localhost:3000/api/
KPN_PHONE_JSON_URL=https://gist.githubusercontent.com/MaxKostenko/cfb308759c6b2c9762e91dadafe70c0e/raw/934bf752550a715712c905330c8db683674fb57c/phone_feed.json
```

Then run the following commands:

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev
```

## Folder structure

A brief overview of the folder structure

- `api` - Service for connection express api
- `assets` - Fonts and icons
- `components` - All repo components
- `enums` - Enums used in the repo
- `errors` - Custom errors
- `helpers` - Folder for helper classes
- `interfaces` - All interfaces used in the repo
- `layouts` - NuxtJs folder for layouts, has default layout
- `pages` - NuxtJs base folder for pages, only consists of index.js
- `server` - NuxtJs Server middleware used to generate endpoint in NodeJs for retrieving phone json
- `static` - Static images folder
- `types` - Custom type for the repo
