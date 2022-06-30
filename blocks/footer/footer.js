import { readBlockConfig, decorateIcons } from '../../scripts/scripts.js';

/**
 * loads and decorates the footer
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  const config = readBlockConfig(block);
  block.textContent = '';

  const footerPath = config.footer || '/footer';
  const resp = await fetch(`${footerPath}.plain.html`);
  const html = await resp.text();
  const footer = document.createElement('div');
  footer.innerHTML = html;
  await decorateIcons(footer);

  const classes = ['copyright', 'contact'];
  classes.forEach((e, j) => {
    const section = footer.children[j];
    if (section) section.classList.add(`footer-${e}`);
  });

  block.append(footer);
}
