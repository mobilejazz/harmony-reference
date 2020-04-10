import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

function LinkCard(props) {
  const isAbsolute = /http/.test(props.href);
  const href = isAbsolute ? props.href : useBaseUrl(props.href);

  return (
    <a className="link-card" href={href}>
      <div className="link-card__content">
          <h3 className="link-card__title">{props.title}</h3>
          <p className="link-card__description">{props.description}</p>
      </div>
      <div className="link-card__footer">{props.footer}</div>
    </a>
  );
}

export default LinkCard;
