const { dirname, extname, join } = require('path');
const { existsSync, readFileSync } = require('fs');
const globby = require('globby');
const frontMatter = require('front-matter');
const colors = require('colors/safe');
const markdownLinkExtractor = require('markdown-link-extractor');
const docsPath = join(__dirname, '../docs');

function validateLowerCase(file) {
  const docsFile = file.replace(docsPath, '');
  const isLowerCase = docsFile === docsFile.toLowerCase();

  if (!isLowerCase) {
    return ['Files and folders must be lower-case and words must be separated with a dash (-).'];
  }

  return [];
}

function validateExtension(file) {
  const ext = extname(file);

  if (ext !== '.md' && ext !== '.mdx') {
    return ['File extension must be .md or .mdx.'];
  }

  return [];
}

function validateFrontMatter(file, content) {
  const attrs = frontMatter(content).attributes;
  const hasFrontMatter = Object.keys(attrs).length !== 0;

  if (!('title' in attrs)) {
    return ['Front matter should have "title" property defined.'];
  }

  return [];
}

function validateNoTopLevelTitle(file, content) {
  const codeFences = /(```[\s\S]+?```)/gm;
  const h1Headings = /^(#[^#\n]+)/gm;
  const matches = [...content.replace(codeFences, '').matchAll(h1Headings)].map(m => m[0]);

  return matches.map(m => {
    return `No top level markdown title allowed: "${colors.red(m)}", use front-matter "title" instead.`;
  });
}

/**
 * Check if a linked file exists
 *
 * It's either absolute or relative. Absolute links start with `/docs/` which
 * maps to /pages/ folder.
 *
 * @param {string} file Markdown file path
 * @param {string} link Link to check
 */
function linkExists(file, link) {
  const isAbsolute = /^\/docs\//.test(link);
  const linkFilePath = isAbsolute ?
                       join(docsPath, link.replace("/docs/", "")) :
                       join(dirname(file), link);
  const fileExists = existsSync(`${linkFilePath}.md`) || existsSync(`${linkFilePath}.mdx`);

  return fileExists;
}

function validateLinks(file, content) {
  const links = markdownLinkExtractor(content).filter(link => !link.includes('http'));
  const errors = [];
  const imageExts = ['.gif', '.jpg', '.jpeg', '.png', '.webp'];

  links.forEach(link => {
    const extension = extname(link);
    const hasExtension = extension !== "";
    const hasPagesPrefix = /^\/?pages\//.test(link);
    const hasConfigsPrefix = /^\/?configs\//.test(link);
    const linkDoesNotExist = !linkExists(file, link);
    const isImage = imageExts.includes(extension);

    // Ignore image links
    if (isImage) {
      return;
    }

    // Ignore configs downloads
    if (hasConfigsPrefix) {
      return;
    }

    if (hasExtension) {
      errors.push(`Remove "${colors.red(link)}" link "${extension}" extension.`);
    }

    if (hasPagesPrefix) {
      errors.push(`Remove "${colors.red(link)}" link "pages/" prefix.`);
    }

    if (linkDoesNotExist) {
      errors.push(`Linked doc ID "${colors.red(link)}" doesn't exist. Fix relative path or alternativelly prepend with ${colors.green('/docs/')} to make the link absolute.`);
    }
  });

  return errors;
}

function validateFile(file) {
  const content = readFileSync(file, 'utf-8');
  const ignoreExts = ['.gif', '.jpg', '.jpeg', '.png', '.webp'];
  const ext = extname(file);
  let errors = [];

  if (ignoreExts.includes(ext)) {
    return { file, errors };
  }

  const validators = [
    validateLowerCase,
    validateExtension,
    validateLinks,
    validateNoTopLevelTitle,
    validateFrontMatter,
  ];

  validators.forEach(validate => {
    const validationErrors = validate(file, content);

    if (validationErrors.length) {
      errors = errors.concat(validationErrors);
    }
  });

  return { file, errors };
}

(async () => {
  const files = await globby(`${docsPath}/**/*`);
  const errors = files.map(validateFile).filter(f => f.errors.length > 0);

  errors.forEach(entry => {
    console.log('📄 ' + colors.yellow(entry.file.replace(docsPath, '')));

    entry.errors.forEach(error => {
      console.log(`    💥 ${error}`);
    });

    console.log('');
  });

  if (!!errors.length) {
    // Signal that there were errors
    process.exit(1);
  } else {
    console.log('✅ There are no issues! 🎉🎉')
  }
})();
