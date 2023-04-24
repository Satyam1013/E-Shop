import { ReactNode, useContext } from "react";
import { Box, Alert, AlertIcon } from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useContext(AuthContext);
  if (!isAuthenticated) {
    return (
      <Box display={"flex"} justifyContent="center" m="auto" width="200px">
        <Alert status="error">
          <AlertIcon />
          Please Login First
        </Alert>
      </Box>
    );
  }
  return <>{children}</>;
};

export default PrivateRoute;
