BASEDIR=$(CURDIR)
INPUTDIR=$(BASEDIR)/resumes
TEMPLATEDIR=$(BASEDIR)/templates
OUTPUTDIR=$(BASEDIR)/output
AUXDIR=$(BASEDIR)/aux

all:
	@$(call mkdirs)
	@for resume in $(INPUTDIR)/*$(name)*.md; \
	do \
	filename="$${resume##*/}"; \
	$(call chart,$$resume,$${filename%.md}) \
	$(call pdf,$$resume,$${filename%.md}) \
	done

define mkdirs
	mkdir -p output; \
	mkdir -p aux;
endef

define chart
	pandoc "$(1)" \
	--metadata title="Resume-$(2)" \
	--template "$(TEMPLATEDIR)"/chart.html \
	--from markdown_github+yaml_metadata_block \
	--output "$(AUXDIR)"/"$(2)"-skills.html; \
	node "$(TEMPLATEDIR)"/map.js \
	"file://$(AUXDIR)"/"$(2)"-skills.html \
	"$(AUXDIR)"/"$(2)"-skills.pdf;
endef

define pdf
	pandoc "$(1)" \
	--template "$(TEMPLATEDIR)"/template.tex \
	--from markdown_github+yaml_metadata_block \
	--output "$(OUTPUTDIR)"/Resume-"$(2)".pdf;
endef

.PHONY: all
