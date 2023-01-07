import React from 'react';
import _styled from '@emotion/styled';

import ScrollSection from './components/ScrollSection.js';

const styled = _styled.default || _styled;

const ScrollSection2Container = styled('div')(({ theme }) => ({
  margin: '0 auto',
  padding: '1rem',
  maxWidth: theme.contentMaxWidth,
  fontSize: '1.2rem',
  color: '#888888',

  '& strong': {
    color: 'rgb(29, 29, 31)',
    float: 'left',
    marginRight: '0.2em',
    fontSize: '3rem',
  },

  [theme.breakpoints.desktop]: {
    fontSize: '2rem',

    '& strong': {
      fontSize: '6rem',
    },
  },
}));

export default function ScrollSection2() {
  return (
    <ScrollSection type="normal">
      <ScrollSection2Container>
        <strong>Normal Scroll</strong>
        {/* eslint-disable-next-line max-len */}
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque placeat temporibus repellat fuga nisi accusamus dicta debitis sunt architecto alias magnam unde minima aspernatur ipsum a animi veniam praesentium error atque, reprehenderit, eaque odio possimus ipsam. Cupiditate iusto, sequi non facilis ipsam, fugiat alias laudantium porro eaque rem corporis sit dicta necessitatibus officia sed voluptates doloremque animi laboriosam deleniti, voluptate id repellendus. Repudiandae ratione nihil asperiores officiis quasi adipisci ea nobis magni illo dolor dolores sunt cum eligendi, amet corporis facilis veniam. Dolorum cum, magnam, deserunt voluptas molestiae hic dignissimos ut vel veritatis nisi eaque, nihil illum atque eum. Consectetur, quos aut dolorum aliquid aperiam ad porro harum corrupti perferendis veritatis sunt cupiditate id quo autem. Rem distinctio ducimus facilis tempore dolores! Praesentium mollitia distinctio fuga. Eveniet impedit, ad doloremque sit vero, laudantium voluptate accusamus cumque doloribus alias dicta? Illum, doloribus architecto? Delectus tempore asperiores, adipisci perspiciatis, reprehenderit ea tempora quidem veritatis molestias in vero et eius amet, atque nobis assumenda architecto aperiam esse? Hic expedita perspiciatis mollitia repellat, placeat alias quisquam? Placeat amet molestias consequatur, rem exercitationem repellat culpa autem porro commodi in corporis eos dolorem tenetur veniam voluptates aut eveniet ipsa iusto aliquid quis officiis incidunt quisquam necessitatibus.
      </ScrollSection2Container>
    </ScrollSection>
  );
}
