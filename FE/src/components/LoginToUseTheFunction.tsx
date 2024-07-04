const LoginToUseTheFunction = ({ title }: { title: string }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center pt-5">
      <img src="/images/isfeature.png" alt="" className="w-2/5" />
      <p>{title}</p>
    </div>
  );
};

export default LoginToUseTheFunction;
