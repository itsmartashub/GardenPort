<div align="center">
  <img width="120" height="120" src="https://github.com/itsmartashub/GardenPort/blob/master/.github/repo-icon.png" alt="GardenPort icon" />
  <h1>GardenPort</h1>
  <p>Backup and restore your <a href="https://radio.garden">Radio Garden</a> favorites.<br/>Export to JSON or clipboard — import in seconds.</p>

  <img src="https://img.shields.io/badge/radio%20garden-compatible-1e4d35?style=flat&logo=radio&logoColor=%2369B87E&labelColor=%23102215&color=%231e4d35" alt="Radio Garden compatible" />
  <img src="https://img.shields.io/badge/browser%20extension-supported-2e2a52?style=flat&logo=googlechrome&logoColor=%2369B87E&labelColor=%23102215&color=%232e2a52" alt="Browser Extension" />
  <img src="https://img.shields.io/badge/data%20format-json-4a3520?style=flat&logo=json&logoColor=%2369B87E&labelColor=%23102215&color=%234a3520" alt="JSON" />
  <img src="https://img.shields.io/badge/clipboard-copy%20%26%20paste-4a2318?style=flat&logo=clipboard&logoColor=%2369B87E&labelColor=%23102215&color=%234a2318" alt="Clipboard" />
  <img src="https://img.shields.io/badge/privacy-100%25%20local-1a2e42?style=flat&logo=shield&logoColor=%2369B87E&labelColor=%23102215&color=%231a2e42" alt="Privacy" />
</div>

<br>

<img src="https://github.com/itsmartashub/GardenPort/blob/master/.github/repo-banner.png" alt="GardenPort Banner" width="100%"/>

**GardenPort** is a utility for **Radio Garden** listeners who want manual control over their `Favorite` station lists. It interacts with the local storage used by **Radio Garden** to allow for simple backups and restorations.

Whether you need to save your station list before clearing your browser data or you want to move your favorites to a different browser, **GardenPort** provides the tools to handle your data directly.

## Features

### Exporting

- **Save to file**: Export your entire station list as a `JSON` file.
- **Quick copy**: One-click `Copy to clipboard` for fast sharing or manual text-based backups.

### Importing

- **Flexible input**: Restore your stations by uploading a previously saved `JSON` file or direct `Paste` from your clipboard.
- **Smart merging**: Add imported stations to your current list without losing your existing favorites.
- **Full override**: Replace your current favourites entirely with a new imported list for a fresh start.

## Installation

### Web Store Installation

#### Chrome Web Store

1. Go to the [GardenPort extension page](https://chromewebstore.google.com/detail/gardenport-radio-garden-f/ffnajpljoajekdnamceamghmajpnikml)
2. Click the `Add to Chrome` button
3. Confirm the installation when prompted
4. Visit the [Radio Garden](https://radio.garden/) website to start using GardenPort.

#### Firefox Add-On

1. Go to [GardenPort Firefox Add-ons page](https://addons.mozilla.org/en-US/firefox/addon/gardenport-radio-garden-backup/)
2. Click the `Add to Firefox` button
3. Confirm the installation when prompted by clicking the `Add`
4. Visit the [Radio Garden](https://radio.garden/) website to start using GardenPort.

### Developer Mode Installation

#### Chromium

1. Download the `gardenport-*.*.*-chrome.zip` from the [Releases](https://github.com/itsmartashub/GardenPort/releases).
2. Open Chrome, go to `chrome://extensions/`
3. Enable `Developer mode` in the top-right corner.
4. Drag in the `zip` file

#### Firefox

1. Download the `gardenport-*.*.*-chrome.zip` from the [Releases](https://github.com/itsmartashub/GardenPort/releases)
2. Open Firefox, go to `about:debugging`
3. Enable `Add-on debugging` in `This Firefox`
4. Click `Load Temporary Add-on` and select the `zip` file

## Technical note

**GardenPort** interacts with the `localStorage` and `IndexDB` used by Radio Garden to manage your "Favorite" list.

- **Recommendation**: Always export a backup of your current stations before performing a `Replace all` import.
- **Privacy**: All operations happen locally. **GardenPort** does not track, collect, or upload your station data to any external servers.

## Support

If you can afford it and find GardenPort valuable, you can support its development with a `pay-what-you-want` contribution on [KO-FI](https://ko-fi.com/http417).
