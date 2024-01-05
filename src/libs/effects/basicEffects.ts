import gsap from "gsap";
type configFade = {
    duration?: number;
}
type targetElement = HTMLDivElement;

export const fadeEffect = {
    name: "fadeEffect",
    defaults: { duration: 2 },
    extendTimeline: true,
    effect: (targets: targetElement, config: configFade) => {
        return gsap.to(targets, { duration: config.duration, opacity: 0, ...config });
    },
};
