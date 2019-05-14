import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from '@rebass/grid';
import { FormattedMessage, FormattedDate } from 'react-intl';
import QRCode from 'qrcode.react';
import styled from 'styled-components';
import { borderRadius } from 'styled-system';

import { ExternalLink } from 'styled-icons/feather/ExternalLink';

import Container from './Container';
import StyledHr from './StyledHr';
import { P, Span } from './Text';
import Currency from './Currency';

const Card = styled(Box)`
  width: 7in;
  height: 4in;
  position: relative;
  overflow: hidden;
  background-image: url('/static/images/oc-gift-card-front-straightened.svg');
  background-size: 100%;
  background-repeat: no-repeat;
  border: 1px solid lightgrey;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 0.28in;

  @media print {
    width: 3.5in;
    height: 2in;
    font-size: 0.14in;
    break-inside: avoid;
  }

  ${borderRadius};
`;

const OpenCollectiveLogo = styled.img.attrs({
  src: '/static/images/opencollective-icon.svg',
  alt: '',
})`
  width: 3em;
  height: 3em;
`;

/**
 * A static gift card meant to be printed to be offered to someone. It has standard
 * business card resolution (3.5in x 2in) but is rendered two time bigger for HDPI.
 */
const PrintableGiftCard = ({ amount, currency, code, expiryDate, tagline, withQRCode, ...styleProps }) => {
  const websiteUrl = process.env.WEBSITE_URL || 'https://opencollective.com';
  const shortWebsiteUrl = websiteUrl.replace('https://', '');
  const redeemUrl = `${websiteUrl}/redeem/${code}`;
  const basePaddingX = '0.8em';
  const paddingTop = '1em';

  return (
    <Card {...styleProps}>
      {/** Header */}
      <Flex justifyContent="space-between" alignItems="center" px={basePaddingX} pt={paddingTop}>
        <Flex alignItems="center">
          <OpenCollectiveLogo />
          <Flex flexDirection="column" ml="0.8em">
            <P fontWeight="bold" fontSize="1.1em" lineHeight="1.5em">
              Open Collective
            </P>
            {tagline && (
              <P fontSize="0.75em" lineHeight="0.8em" color="white.transparent.72">
                {tagline}
              </P>
            )}
          </Flex>
        </Flex>

        <Container
          background="#69a0f1"
          color="#d7e8fe"
          borderRadius="1em"
          padding="0.25em 1em"
          boxShadow="2px 3px 5px rgba(0, 0, 0, 0.15)"
          fontWeight="bold"
          fontSize="0.75em"
        >
          <FormattedMessage id="GiftCard" defaultMessage="Gift card" />
        </Container>
      </Flex>

      {/** Content */}
      <Flex justifyContent="space-between" flex="1 1" mb="0.5em">
        {/** Left */}
        <Flex flexDirection="column" justifyContent="space-between" ml={basePaddingX}>
          <Box>
            <StyledHr mt="0.75em" mb="0.5em" borderColor="rgb(62, 129, 230)" borderRadius={8} />
            <P fontSize="0.6em" lineHeight="1.75em" color="black.100">
              Contribute to the project of your choice at <strong>opencollective.com</strong>
            </P>
            {expiryDate && (
              <P fontSize="0.55em" lineHeight="1.75em" color="black.300">
                <FormattedMessage
                  id="ContributePayment.expiresOn"
                  defaultMessage="Expires on {expiryDate}"
                  values={{
                    expiryDate: <FormattedDate value={expiryDate} day="numeric" year="numeric" month="long" />,
                  }}
                />
              </P>
            )}
          </Box>
          <P fontSize="0.8em" my="0.05in">
            <ExternalLink size="1em" color="black" />
            <Span color="black.500" ml={1}>
              {shortWebsiteUrl}/redeem/
            </Span>
            <Span fontWeight="bold" color="black.800">
              {code}
            </Span>
          </P>
        </Flex>

        {/** Right */}
        <Flex flexDirection="column" justifyContent="flex-end" alignItems="flex-end" pr={basePaddingX}>
          <Flex flexDirection="column" justifyContent="flex-end" alignItems="flex-end">
            {withQRCode && (
              <Container height="4.5em" border="1px solid lightgrey" boxShadow="2px 5px 4px rgba(0,0,0,0.15)">
                {/** Use 4x the real size to get a better resolution */}
                <QRCode value={redeemUrl} size={512} fgColor="#313233" style={{ width: '4.5em', height: '4.5em' }} />
              </Container>
            )}
            <Flex mt="1em" mb="0.1em">
              <Span fontWeight="bold" fontSize="2em" lineHeight="1em" color="#313233">
                <Currency value={amount} currency={currency} precision={0} />
              </Span>
              <Box ml="0.25em">
                <Span color="black.700" fontSize="0.9em" className="currency">
                  {currency}
                </Span>
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

PrintableGiftCard.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  expiryDate: PropTypes.string,
  borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tagline: PropTypes.node,
  withQRCode: PropTypes.bool,
};

PrintableGiftCard.defaultProps = {
  tagline: 'Transparent funding for open source',
  withQRCode: true,
};

export default PrintableGiftCard;