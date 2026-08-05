const { useState } = React;

Sentry.init({
  dsn: 'https://examplePublicKey@o0.ingest.sentry.io/0',
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

function ErrorButton() {
  return (
    React.createElement('div', { className: 'container' },
      React.createElement('h1', null, 'Sentry Error Test'),
      React.createElement('button', {
        onClick: () => {
          throw new Error('This is your first error!');
        }
      }, 'Break the world')
    )
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(ErrorButton));
