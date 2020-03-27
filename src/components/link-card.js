import React from 'react';

function LinkCard(props) {
  return (
    <a class="link-card" href="{props.href}">
      <div class="link-card__content">
          <h3 class="link-card__title">{props.title}</h3>
          <p class="link-card__description">{props.description}</p>
      </div>
      <div class="link-card__footer">{props.footer}</div>
    </a>
  );
}

export default LinkCard;
