import React from "react";
import { Breadcrumb, BreadcrumbItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation } from "react-router-dom";

const BreadCrumbs = () => {
  const location = useLocation();
  const pathNames = location.pathname.split("/").filter((item) => item);
  return (
    <>
      <Breadcrumb>
        {pathNames.length > 0 ? (
          <LinkContainer to="/">
            <Breadcrumb.Item>HOME</Breadcrumb.Item>
          </LinkContainer>
        ) : (
          <Breadcrumb.Item>HOME</Breadcrumb.Item>
        )}
        {pathNames.map((path, index) => {
          const routeTo = `/${pathNames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathNames.length - 1;
          return isLast ? (
            <Breadcrumb.Item>{path.toUpperCase()}</Breadcrumb.Item>
          ) : (
            <LinkContainer to={`${routeTo}`}>
              <Breadcrumb.Item>{path.toUpperCase()}</Breadcrumb.Item>
            </LinkContainer>
          );
        })}
      </Breadcrumb>
    </>
  );
};

export default BreadCrumbs;