# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Types of changes:
- `Added` for new features.
- `Changed` for changes in existing functionality.
- `Deprecated` for soon-to-be removed features.
- `Removed` for now removed features.
- `Fixed` for any bug fixes.
- `Security` in case of vulnerabilities.

> Date format: YYYY-MM-DD

> If we have some "Breaking changes" we can mark it in message by `**BREAKING**` preffix, like:  
> `- **BREAKING**: Some message`

-------------

## TODOs
> Todo list for future

- ...

-------------
## 1.3.4 - 2022-04-18
### Added
- possibility to add `doNotReplaceURL` to single image

## 1.3.3 - 2022-03-02
### Fixed
- low preview

## 1.3.2 - 2022-02-09
### Fixed
- change devicePixelRatioList to [1, 1.5, 2]

## 1.3.1 - 2022-01-04
### updated
- utils version to fix img-src starts with "//"
## 1.3.0 - 2021-11-18
### Added
- possibility to remove API versions

## 1.2.0 - 2021-07-19

### Deprecated

- Property **ignoreNodeImgSize** is deprecated. Use **imageSizeAttributes: 'ignore'** instead

### Added
- new property: **imageSizeAttributes**

## 1.1.0 2021-06-16
### Added
- set a custom domain property. This is useful for where a business wants to use a custom cname instead of the default 
  cloudimage.io URL.

## 1.0.5- 2020-04-15
### Fix
- Fix commonjs import in package.json

## 1.0.4- 2020-02-12
### Added
- OnImgLoad to capture event on load
- documentation to readme.md under image properties

## 1.0.3 - 2020-11-09
### updated
- utils version to add src to each size

## 1.0.4 - 2020-10-01
### Fix
- some config values that are passed
### Changed
- how props are passed to image and background
- update documentation 
