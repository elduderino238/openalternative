import type { Tool } from "@openalternative/db/client"
import { Text } from "@react-email/components"
import { addHours, differenceInDays, format, formatDistanceToNowStrict } from "date-fns"
import type { Jsonify } from "inngest/helpers/jsonify"
import { config } from "~/config"
import { EmailButton } from "~/emails/components/button"
import { EmailWrapper, type EmailWrapperProps } from "~/emails/components/wrapper"

export type EmailProps = EmailWrapperProps & {
  tool: Tool | Jsonify<Tool>
}

const EmailToolScheduled = ({ tool, ...props }: EmailProps) => {
  const publishedAt = addHours(tool.publishedAt || new Date(), 2)
  const isLongQueue = differenceInDays(publishedAt, new Date()) > 7
  const dateRelative = formatDistanceToNowStrict(publishedAt, { addSuffix: true })
  const dateFormatted = format(publishedAt, "MMMM do, yyyy")

  return (
    <EmailWrapper signature {...props}>
      <Text>Hey {tool.submitterName}!</Text>

      <Text>
        Great news! Your submitted tool, <strong>{tool.name}</strong>, was{" "}
        <strong>accepted and scheduled</strong> for publication on {config.site.name}.
      </Text>

      {isLongQueue ? (
        <>
          <Text>
            Due to the high volume of submissions we're currently receiving, there's a bit of a
            queue. {tool.name} is scheduled to be added on <strong>{dateFormatted}</strong>.
            However, if you'd like to fast-track your submission, you have the option to skip the
            queue.
          </Text>

          <EmailButton href={`${config.site.url}/submit/${tool.slug}`}>
            Publish {tool.name} within 24 hours
          </EmailButton>
        </>
      ) : (
        <Text>
          {tool.name} is scheduled to be added <strong>{dateRelative}</strong>.
        </Text>
      )}
    </EmailWrapper>
  )
}

export default EmailToolScheduled
