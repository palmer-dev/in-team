import { types } from "@babel/core";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Image, Text, View, StyleSheet } from "react-native";
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import Svg, { Path } from "react-native-svg";

interface AnimatedSloganProps {
  d: string;
  progress: Animated.ShareableValue<number>;
}
const AnimatedPath = Animated.createAnimatedComponent(Path);
const colors = ["#E20613", "#FF8D00", "#0086CD", "#B1A285"];
// Animation epaisseur de trait

const AnimatedSlogan = ({ d, progress }: AnimatedSloganProps) => {
  // Variable
  const stroke = colors[Math.round(Math.random() * (colors.length - 1))];
  const [length, setLength] = useState(0);
  const ref = useRef<typeof AnimatedPath>(null);

  const animatedBGProps = useAnimatedProps(() => ({
    strokeDashoffset:
      length -
      length * Easing.bezier(0.61, 1, 0.88, 1).factory()(progress.value),
    fillOpacity: progress.value,
  }));

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset:
      length -
      length * Easing.bezier(0.37, 0, 0.63, 1).factory()(progress.value),
  }));

  return (
    <>
      {/* Paramètre des traits du svg */}
      <AnimatedPath
        animatedProps={animatedBGProps}
        stroke={stroke}
        d={d}
        strokeWidth={3}
        strokeDasharray={length}
      />
      <AnimatedPath
        animatedProps={animatedProps}
        onLayout={() => setLength(ref.current.getTotalLength())}
        ref={ref}
        d={d}
        stroke="black"
        strokeWidth={3}
        strokeDasharray={length}
      />
    </>
  );
};

export default AnimatedSlogan;
