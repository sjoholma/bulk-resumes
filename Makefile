BASEDIR=$(CURDIR)
INPUTDIR=$(BASEDIR)/resumes
TEMPLATEDIR=$(BASEDIR)/templates
OUTPUTDIR=$(BASEDIR)/output
AUXDIR=$(BASEDIR)/aux

all:
	@$(call mkdirs)
	@for resume in $(INPUTDIR)/*$(name)*.md; \
	do \
	filepath=$${resume%.*}; \
	filename="$${resume##*/}"; \
	$(call chart,$$filepath.yaml,$${filename%.md}) \
	$(call pdf,$$filepath.md,$$filepath.yaml,$${filename%.md}) \
	done

define mkdirs
	mkdir -p output; \
	mkdir -p aux;
endef

define chart
	pandoc "$(1)" \
	--metadata title="Resume-$(2)" \
	--template "$(TEMPLATEDIR)"/chart.html \
	--from markdown_strict+yaml_metadata_block \
	--output "$(AUXDIR)"/"$(2)"-skills.html; \
	node "$(TEMPLATEDIR)"/pdf.js \
	"file://$(AUXDIR)"/"$(2)"-skills.html \
	"$(AUXDIR)"/"$(2)"-skills.pdf;
endef

define pdf
	pandoc "$(1)" "$(2)" \
	--template "$(TEMPLATEDIR)"/template.tex \
	--from markdown_strict+yaml_metadata_block \
	--output "$(OUTPUTDIR)"/Resume-"$(3)".pdf;
endef

.PHONY: all
