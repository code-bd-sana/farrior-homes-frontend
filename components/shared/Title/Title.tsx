type Props = {
  title: string;
  subtitle?: string;
  fontFamily?: string;
  titleClass?: string;
  subtitleClass?: string;
};

const Title = ({
  title,
  subtitle,
  fontFamily = "abhaya-libre",
  titleClass = "",
  subtitleClass = "",
}: Props) => {
  const mergedTitleClass = `${fontFamily}-extrabold ${titleClass}`.trim();
  const mergedSubtitleClass = `${fontFamily} ${subtitleClass}`.trim();

  return (
    <>
      <h1 className={mergedTitleClass}>{title}</h1>
      {subtitle && <p className={mergedSubtitleClass}>{subtitle}</p>}
    </>
  );
};

export default Title;
