/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path');
const markdownIt = require('markdown-it');

const md = markdownIt({
  html: true,
  linkify: true,
  typographer: true,
});
const paths = {
  postsDir: path.join(process.cwd(), 'posts'),
};

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  //render posts
  const { data, errors } = await graphql(`
    {
      allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
        totalCount
        edges {
          node {
            tableOfContents(absolute: false)
            fileAbsolutePath
            rawMarkdownBody
            frontmatter {
              title
              date
              tags
            }
            excerpt(format: PLAIN)
          }
        }
      }
    }
  `);

  if (errors) {
    throw errors;
  }
  const blogPostTemplate = path.resolve(__dirname, './src/templates/PostTemplate.tsx');
  const blogTagPageTemplate = path.resolve(__dirname, './src/templates/TagPageTemplate.tsx');
  const blogIndexPageTemplate = path.resolve(__dirname, './src/templates/IndexPageTemplate.tsx');

  const posts = data.allMarkdownRemark.edges;
  const pagesByIndex = [[]];
  const pagesByTags = {};
  const pageSize = 10;
  //시간순, 시간이 같다면 이름순(desc)
  posts.sort((a, b) => {
    let diff = b.node.frontmatter.date - a.node.frontmatter.date;
    if (diff === 0) {
      diff = a.node.frontmatter.title - b.node.frontmatter.title;
    }
    return diff;
  });

  for (let post of posts) {
    const { node } = post;
    const { rawMarkdownBody, fileAbsolutePath, frontmatter, excerpt } = node;
    let { tags, title, date, group } = frontmatter;
    const html = md.render(rawMarkdownBody);
    tags = tags || [];
    let pageByIndex = pagesByIndex[pagesByIndex.length - 1];
    if (pageByIndex.length > pageSize) {
      pageByIndex = [];
      pagesByIndex.push(pageByIndex);
    }

    let buildDir = path.join(
      'posts',
      path.relative(paths.postsDir, fileAbsolutePath),
    )
    createPage({
      path: buildDir,
      context: {
        html: html,
        title: frontmatter.title,
        date: frontmatter.date,
        tags
      },
      component: blogPostTemplate,
    });

    pageByIndex.push({
      path: buildDir,
      title: frontmatter.title,
      excerpt,
      date: frontmatter.date,
      tags: frontmatter.tags,
    });

    for (let tag of tags) {
      let pageByTag = pagesByTags[tag];
      if (pageByTag === undefined) {
        pageByTag = [];
        pagesByTags[tag] = pageByTag;
      }
      pageByTag.push({
        path: buildDir,
        title: frontmatter.title,
        excerpt,
        date: frontmatter.date,
        tags: frontmatter.tags,
      });
    }
  }

  const tags = Object.keys(pagesByTags);
  for (let tag of tags) {
    const pageOfTag = pagesByTags[tag];
    const path = `/tags/${tag}`
    createPage({
      path: path,
      context: {
        list: pageOfTag,
        tags: tags,
        currentTag: tag,
      },
      component: blogTagPageTemplate,
    })
  }

  for (let index in pagesByIndex) {
    const pageOfIndex = pagesByIndex[index];
    const path = `/page/${Number(index) + 1}`
    createPage({
      path: path,
      context: {
        list: pageOfIndex,
        tags,
        currentPage: index,
        totalPageCount: pagesByIndex.length
      },
      component: blogIndexPageTemplate,
    })
  }
};
