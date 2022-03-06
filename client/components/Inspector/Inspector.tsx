import React, { useLayoutEffect, useState } from 'react';
import { inspect } from '@xstate/inspect';
import styled from 'styled-components';

const Button = styled.button``;

export interface IInspector {
  toggleable?: boolean;
}

export function Inspector({ toggleable }: IInspector): JSX.Element {
  const [inspecting, setInspecting] = useState(!toggleable);

  // required to run before render cycle so as that listeners are present when machine is mounted
  // mocking this in the test seems overkill, so just don't change this
  useLayoutEffect(() => {
    const i = inspect();

    return () => {
      i?.disconnect();
    };
  }, []);

  return (
    <>
      {toggleable && (
        <Button
          type="button"
          onClick={() => {
            setInspecting((x) => !x);
          }}
        >
          {inspecting ? 'hide inspector' : 'show inspector'}
        </Button>
      )}
      <iframe
        id="xstate"
        title="xstate"
        data-xstate
        style={{
          display: inspecting ? 'block' : 'none',
          height: '95vh',
          width: '100%',
        }}
      />
    </>
  );
}
