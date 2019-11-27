import React, { FunctionComponent } from 'react';
import Quote from '../../components/Quote';
import { useOvermind } from '../../overmind';
import nanoid from 'nanoid';
import { quote } from '../../overmind/api/types';

const Quotes: FunctionComponent = () => {
  const {
    actions,
    state: {
      quotes: { graph, favs }
    }
  } = useOvermind();
  const mappedList = graph.getMappedQuotes();
  const favoriteList: Array<quote> = [],
    otherList: Array<quote> = [];
  for (const item in mappedList) {
    if (favs.indexOf(item) !== -1) {
      favoriteList.push(mappedList[item]);
    } else {
      otherList.push(mappedList[item]);
    }
  }
  return (
    <ul>
      {favoriteList.map((item: quote) => (
        <Quote
          key={nanoid()}
          {...item}
          isFav={true}
          onFavChange={actions.quotes.manageFavs}
        />
      ))}
      {otherList.map((item: quote, index) => (
        <li key={nanoid()}>
          <Quote
            {...item}
            withoutBorder={index === otherList.length - 1}
            onFavChange={actions.quotes.manageFavs}
          />
        </li>
      ))}
    </ul>
  );
};

export default Quotes;
