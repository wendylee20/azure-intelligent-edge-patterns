import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Stack,
  Text,
  Image,
  Link,
  mergeStyleSets,
  getTheme,
  concatStyleSets,
  IStyle,
  ImageFit,
} from '@fluentui/react';
import { Card } from '@uifabric/react-cards';
import { AcceptMediumIcon } from '@fluentui/react-icons';

const theme = getTheme();

const idxIconBase: IStyle = {
  borderRadius: '12px',
  width: '20px',
  height: '20px',
  fontSize: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '12px',
};
const cardStyleSets = mergeStyleSets({
  container: {
    width: '300px',
    borderRadius: '2px',
  },
  imgSection: {
    height: '169px',
    backgroundColor: '#F2F2F2',
  },
  mainSection: {
    display: 'grid',
    gridTemplateColumns: '24px auto',
    columnGap: '11px',
    gridTemplateRows: '1fr 1fr 30px',
    rowGap: '4px',
    padding: '14px',
    paddingTop: 0,
  },
  idxIcon: concatStyleSets(idxIconBase, { color: theme.palette.themePrimary, border: '1px solid' }),
  checkIcon: concatStyleSets(idxIconBase, { color: theme.palette.white, backgroundColor: '#5DB300' }),
  mainSectionTitle: { gridColumn: '2 / span 1', gridRow: '1 / span 2', fontWeight: 600, fontSize: '16px' },
  mainSectionContentTxt: { gridColumn: '2 / span 1', gridRow: '2 / span 1', fontSize: '13px' },
  mainSectionAction: { gridColumn: '2 / span 1', gridRow: '3 / span 1', fontSize: '13px' },
});

type CustomizeType = {
  hasCamera: boolean;
  hasImages: boolean;
  hasTask: boolean;
};

export const Customize: React.FC<CustomizeType> = ({ hasCamera, hasImages, hasTask }) => {
  return (
    <Stack horizontalAlign="center">
      <Stack horizontalAlign="center" styles={{ root: { paddingTop: 60, paddingBottom: 40 } }}>
        <Text variant="xLarge" styles={{ root: { margin: '4px' } }}>
          Customize to use your own videos and images
        </Text>
        <Text>Follow these steps to start using machine learning in your factory</Text>
      </Stack>
      <Stack horizontal tokens={{ childrenGap: 20 }}>
        <GetStartedCard
          no={1}
          checked={hasCamera}
          title="Connect your own video feed"
          contentTxt="Add and configure the cameras in the factory"
          actionTxt="Go to Cameras"
          actionLink="/cameras"
          src="/icons/customize_1.svg"
        />
        <GetStartedCard
          no={2}
          checked={hasImages && hasCamera}
          title="Capture images and tag objects"
          contentTxt="Capture images from your video streams and tag objects"
          actionTxt="Go to Images"
          actionLink="/images"
          src="/icons/customize_2.svg"
        />
        <GetStartedCard
          no={3}
          checked={hasTask && hasImages && hasCamera}
          title="Ready to go!"
          contentTxt="Start identifying parts from your cameras’ live streams"
          actionTxt="Begin a task"
          actionLink="/home/deployment"
          src="/icons/customize_3.svg"
        />
      </Stack>
    </Stack>
  );
};

const GetStartedCard: React.FC<{
  no: number;
  checked: boolean;
  title: string;
  contentTxt: string;
  actionTxt: string;
  actionLink: string;
  src: string;
}> = ({ no, checked, title, contentTxt, actionTxt, actionLink, src }) => {
  const renderIdxIcon = (): JSX.Element =>
    checked ? (
      <div className={cardStyleSets.checkIcon}>
        <AcceptMediumIcon />
      </div>
    ) : (
      <div className={cardStyleSets.idxIcon}>
        <p>{no}</p>
      </div>
    );

  return (
    <Card className={cardStyleSets.container}>
      <Card.Item fill className={cardStyleSets.imgSection}>
        <Image src={src} height="100%" imageFit={ImageFit.contain} />
      </Card.Item>
      <Card.Section className={cardStyleSets.mainSection}>
        {renderIdxIcon()}
        <Text className={cardStyleSets.mainSectionTitle}>{title}</Text>
        <Text className={cardStyleSets.mainSectionContentTxt}>{contentTxt}</Text>
        <Link className={cardStyleSets.mainSectionAction} to={actionLink} as={ReactRouterLink}>
          {actionTxt} {'>'}
        </Link>
      </Card.Section>
    </Card>
  );
};
