
import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const getBreadcrumbs = (pathname: string) => {
  const paths = pathname.split('/').filter(Boolean);
  if (paths.length === 0) return [{ label: 'Dashboard', href: '/' }];

  return paths.reduce((acc: Array<{ label: string; href: string }>, path, index) => {
    const href = `/${paths.slice(0, index + 1).join('/')}`;
    const label = path.charAt(0).toUpperCase() + path.slice(1);
    return [...acc, { label, href }];
  }, [{ label: 'Dashboard', href: '/' }]);
};

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const breadcrumbs = getBreadcrumbs(location.pathname);
  const lastIndex = breadcrumbs.length - 1;

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={crumb.href}>
            {index === lastIndex ? (
              <BreadcrumbItem>
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              <BreadcrumbItem>
                <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
              </BreadcrumbItem>
            )}
            {index < lastIndex && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
