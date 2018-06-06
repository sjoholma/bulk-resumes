# Bulk resume generator
Transforms github-markdown+yaml resumes into PDF via pandoc and phantomjs. 
Using LaTeX and Google Charts for template.

## Setup
```
brew install phantomjs pandoc
brew cask install basictex
tlmgr install lato hyphenat slantsc
```

## Build
```
make [name=(name)]
```