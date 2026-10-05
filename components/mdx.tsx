import Link from "next/link";
import type { ComponentProps } from "react";
import { Cta } from "./Cta";

/** Components available inside blog MDX. Internal links use next/link. */
export const mdxComponents = {
  a: ({ href = "", ...props }: ComponentProps<"a">) =>
    href.startsWith("/") ? <Link href={href} {...props} /> : <a href={href} rel="noopener noreferrer" {...props} />,
  GeneratorCta: ({ title, text }: { title?: string; text?: string }) => <Cta title={title} text={text} />,
};
