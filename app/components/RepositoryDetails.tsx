import type { SerializeFrom } from "@remix-run/node"
import { CopyrightIcon, GitForkIcon, GithubIcon, StarIcon, TimerIcon } from "lucide-react"
import { posthog } from "posthog-js"
import type { HTMLAttributes } from "react"
import { format } from "timeago.js"
import type { LanguageToToolMany, ToolOne } from "~/services.server/api"
import { cx } from "~/utils/cva"
import { Button } from "./Button"
import { H5 } from "./Heading"
import { Insights } from "./Insights"
import { NavigationLink } from "./NavigationLink"
import { Series } from "./Series"

type RepositoryDetailsProps = HTMLAttributes<HTMLElement> & {
  tool: SerializeFrom<ToolOne>
  languages: SerializeFrom<LanguageToToolMany[]>
}

export const RepositoryDetails = ({
  className,
  tool,
  languages,
  ...props
}: RepositoryDetailsProps) => {
  const insights = [
    { label: "Stars", value: tool.stars.toLocaleString(), icon: StarIcon },
    { label: "Forks", value: tool.forks.toLocaleString(), icon: GitForkIcon },
    {
      label: "Last commit",
      value: tool.lastCommitDate && format(tool.lastCommitDate),
      title: tool.lastCommitDate ?? undefined,
      icon: TimerIcon,
    },
    { label: "License", value: tool.license, icon: CopyrightIcon },
  ]

  return (
    <div className={cx("flex flex-col  gap-5 rounded-lg border p-5", className)} {...props}>
      <Series direction="column">
        <H5>Repository details:</H5>
        <Insights insights={insights} className="text-sm" />
      </Series>

      {!!languages.length && (
        <Series direction="column">
          <H5>Written in:</H5>

          {languages?.map(({ percentage, language }) => (
            <h6 key={language.slug}>
              <NavigationLink to={`/languages/${language.slug}`}>
                <span
                  className="size-2 rounded-full"
                  style={{ backgroundColor: language.color ?? undefined }}
                />
                {language.name} <span className="opacity-50">({percentage}%)</span>
              </NavigationLink>
            </h6>
          ))}
        </Series>
      )}

      {tool.repository && (
        <Button
          size="md"
          variant="secondary"
          prefix={<GithubIcon />}
          onClick={() => posthog.capture("repository_clicked", { url: tool.repository })}
          className="mt-1 self-start"
          asChild
        >
          <a href={tool.repository} target="_blank" rel="noreferrer nofollow">
            View Repository
          </a>
        </Button>
      )}
    </div>
  )
}
