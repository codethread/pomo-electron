import React, { useRef } from 'react';
import T from '@client/copy';
import { useTimerSettings } from '@client/hooks';
import { Button } from '@client/components';
import { timerSettingsModel } from '@client/machines';
import { ButtonPair, ErrorMsg, Form, InputText, Label } from './Form';
import { Setting } from './Setting';

const { CANCEL, SAVE, UPDATE } = timerSettingsModel.events;

export function Timer(): JSX.Element {
  const [state, send] = useTimerSettings();
  const {
    context: { long, pomo, short },
  } = state;
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Setting variant="simple" heading="Timer" styles={{ marginTop: '' }}>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          send(SAVE());
          inputRef.current?.focus();
        }}
      >
        <TimerInput
          name="Pomodoro"
          ariaLabel="Set the duration, in minutes, of a pomodoro timer"
          error={pomo.error}
          value={pomo.value}
          onChange={(n) => {
            send(UPDATE('pomo', n));
          }}
        />
        <TimerInput
          name="Short Break"
          ariaLabel="Set the duration, in minutes, of each short break timer between pomodoros"
          error={short.error}
          value={short.value}
          onChange={(n) => {
            send(UPDATE('short', n));
          }}
        />
        <TimerInput
          name="Long Break"
          ariaLabel="Set the duration, in minutes, of each long break timer which runs after completing several pomodoros"
          error={long.error}
          value={long.value}
          onChange={(n) => {
            send(UPDATE('long', n));
          }}
        />
        <ButtonPair
          Confirm={
            <Button
              disabled={!state.can('SAVE')}
              type="submit"
              style={{ gridColumn: 'middle-r / right' }}
            >
              {T.settings.submit}
            </Button>
          }
          Cancel={
            <Button
              disabled={!state.can('CANCEL')}
              type="button"
              variant="secondary"
              style={{ gridColumn: 'middle-r / right' }}
              onClick={() => {
                send(CANCEL());
                inputRef.current?.focus();
              }}
            >
              {T.settings.cancel}
            </Button>
          }
        />
      </Form>
    </Setting>
  );
}

interface ITimerInput {
  name: string;
  ariaLabel: string;
  error?: string;
  value: number;
  onChange: (n: number) => void;
}

function TimerInput({ name, onChange, value, error, ariaLabel }: ITimerInput): JSX.Element {
  const id = `timer-form-${name.toLowerCase().replace(/ /g, '-')}`;
  return (
    <>
      <Label htmlFor={id} aria-label={ariaLabel}>
        {name}
      </Label>
      <InputText
        id={id}
        type="number"
        {...(error && {
          error: true,
          'aria-describedby': `${id}-error`,
        })}
        min={1}
        max={120}
        value={value}
        onChange={({ target: { value: n } }) => {
          onChange(Number(n));
        }}
      />
      {error && (
        <ErrorMsg id={`${id}-error`} aria-live="polite">
          {error}
        </ErrorMsg>
      )}
    </>
  );
}
