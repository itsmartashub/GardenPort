<div align="center">
    <div>
      <img src="https://github.com/itsmartashub/gardenport/blob/master/src/assets/img/gp-logo-green-circle.png" alt="logo-for-gardenport-browser-extension" width="500" height="500"  />
    </div>
</div>

<h1 align="center">GardenPort</h1>
<h3 align="center">Backup and restore your favorite Radio Garden stations with ease.</h3>
<br/><br/>

## Features (WIP)

The project is currently a Work in Progress (WIP). The following core functionalities are being implemented:

### Exporting

- Save to file: Export your entire station list as a structured `JSON` file.
- Quick copy: One-click `Copy to clipboard` for fast sharing or manual backups.

### Importing

- Flexible input: Restore stations via `JSON` file upload or direct `Paste` from clipboard.
- Smart merging: Add imported stations to your current list without losing your existing favorites.
- Full override: Replace your current favourites entirely with a new imported list for a fresh start.

## Technical note

**GardenPort** interacts with the local storage used by Radio Garden to manage your "Favorite" list. **It is recommended to export a backup of your current stations before performing a `Replace all` import.**
