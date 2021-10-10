import { render, screen } from '@testing-library/react';
import React from 'react';
import { ForceError } from '@test/ForceError';
import { mocked } from 'ts-jest/utils';
import { ErrorBoundary } from './ErrorBoundary';

interface IRender {
  shouldError?: boolean;
}

function renderW({ shouldError = false }: IRender = {}) {
  const spyError = jest.fn();
  const spyInfo = jest.fn();

  render(
    <ErrorBoundary
      logger={{
        error: spyError,
        info: spyInfo,
      }}
    >
      {shouldError && <ForceError errorMessage="error message" />}
      <div>hello</div>
    </ErrorBoundary>
  );

  return { spyError, spyInfo };
}

describe('Error Boundary', () => {
  describe('when there is no error', () => {
    it('renders children without logging', () => {
      const { spyError, spyInfo } = renderW();

      expect(screen.getByText('hello')).toBeInTheDocument();
      expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
      expect(spyError).not.toHaveBeenCalled();
      expect(spyInfo).not.toHaveBeenCalled();
    });
  });

  describe('when there is an error', () => {
    beforeAll(() => {
      // even though the error is caught, there is some mechanic that causes the error to be logged
      jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterAll(() => {
      mocked(console).error.mockRestore();
    });

    it('renders the error component and logs the error', () => {
      const { spyError } = renderW({ shouldError: true });

      expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
      expect(screen.queryByText('hello')).not.toBeInTheDocument();
      expect(screen.queryByText('error message')).not.toBeInTheDocument();
      expect(spyError).toHaveBeenCalledWith(expect.stringContaining('error message'));
    });
  });
});
