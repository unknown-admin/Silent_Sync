import {useEffect, useState} from 'react';
import {Keyboard, KeyboardEvent} from 'react-native';

export function useKeyboard() {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const onShow = (e: KeyboardEvent) => setHeight(e.endCoordinates.height);
    const onHide = () => setHeight(0);
    const s = Keyboard.addListener('keyboardDidShow', onShow);
    const h = Keyboard.addListener('keyboardDidHide', onHide);
    return () => {
      s.remove();
      h.remove();
    };
  }, []);
  return {keyboardHeight: height, isKeyboardVisible: height > 0};
}
