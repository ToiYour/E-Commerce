import TimeAgo from "react-timeago";
import frenchStrings from "react-timeago/lib/language-strings/vi";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

const TimeAgoVi = ({ date }: { date: string }) => {
  const newDate = date?.toLocaleString("vi-VN");
  const formatter = buildFormatter(frenchStrings);
  return <TimeAgo date={newDate} formatter={formatter} />;
};

export default TimeAgoVi;
