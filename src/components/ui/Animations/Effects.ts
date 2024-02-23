import gsap from "gsap";

export interface ConfigSplitEffect {
  duration: number;
}

export interface Splits {
  chars: HTMLElement[];
}

export const spliteffect = {
  name: "scrambleSplit",
  extendTimeline: true,
  defaults: { duration: 1 },
  effect(splits: Splits[], config: ConfigSplitEffect) {
    let tl = gsap.timeline();
    splits.forEach((split) => {
      let proxy = document.createElement("div"),
        chars = split.chars,
        l = chars.length;
      proxy.innerText = split.chars.map((e) => e.innerText).join("");
      tl.add(
        gsap.to(proxy, config).eventCallback("onUpdate", () => {
          let i = l;
          while (i--) {
            chars[i].innerText = proxy.innerText.charAt(i);
          }
        }),
        0
      );
    });
    return tl;
  },
};
