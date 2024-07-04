import { useNavigate, useSearchParams } from "react-router-dom";

export const useHistoryRouter = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const handle = () => {
    const form = searchParams.get("from");
    if (form) {
      navigate(form);
    } else {
      navigate("/");
    }
  };
  return handle;
};
export const useCurrentRouteAndNavigation = () => {
  const navigate = useNavigate();
  const handleCurrentRoute = () => {
    const currentRouter = location.pathname;
    navigate(`/buyer/login?from=${currentRouter}`);
  };
  return handleCurrentRoute;
};
