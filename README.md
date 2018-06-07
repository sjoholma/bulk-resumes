# Bulk resume generator
Transforms markdown+yaml resumes into PDF via pandoc and puppeteer. 
Using LaTeX and Google Charts for template.

## Setup
```
brew install pandoc
brew cask install basictex
tlmgr install lato hyphenat slantsc
npm install
```

## Build
```
make [name=(name)]
```