import {useEffect, useRef, useState} from 'react';
import {AppState, AppStateStatus} from 'react-native';

export function useAppState() {
  const [state, setState] = useState<AppStateStatus>(
    (AppState.currentState as AppStateStatus) ?? 'active',
  );
  const prev = useRef(state);

  useEffect(() => {
    const sub = AppState.addEventListener('change', next => {
      prev.current = state;
      setState(next);
    });
    return () => sub.remove();
  }, [state]);

  return {
    appState: state,
    isActive: state === 'active',
    justForegrounded:
      prev.current.match(/inactive|background/) != null && state === 'active',
  };
}
