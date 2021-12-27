import { NextPageContext } from 'next';
import NextErrorComponent, { ErrorProps as NextErrorProps } from 'next/error';
const getSentry = () => import('@sentry/nextjs');

type ErrorPageProps = {
  statusCode: number;
  hasGetInitialPropsRun: boolean;
  err: Error | null;
};

type ErrorProps = {
  hasGetInitialPropsRun: boolean;
} & NextErrorProps;

const MyError = ({
  statusCode,
  hasGetInitialPropsRun,
  err,
}: ErrorPageProps) => {
  if (!hasGetInitialPropsRun && err) {
    getSentry().then((Sentry) => Sentry.captureException(err));
  }
  return <NextErrorComponent statusCode={statusCode} />;
};

MyError.getInitialProps = async ({ res, err, asPath }: NextPageContext) => {
  const errorInitialProps: ErrorProps =
    (await NextErrorComponent.getInitialProps({
      res,
      err,
    } as NextPageContext)) as ErrorProps;

  errorInitialProps.hasGetInitialPropsRun = true;

  if (err) {
    getSentry().then((Sentry) => Sentry.captureException(err));

    await getSentry().then((Sentry) => Sentry.flush(2000));

    return errorInitialProps;
  }

  getSentry().then((Sentry) =>
    Sentry.captureException(
      new Error(`_error.js getInitialProps missing data at path: ${asPath}`)
    )
  );
  await getSentry().then((Sentry) => Sentry.flush(2000));

  return errorInitialProps;
};

export default MyError;
