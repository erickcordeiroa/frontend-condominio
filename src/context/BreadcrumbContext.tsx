import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React, { createContext } from "react";

type BreadcrumbItem = {
  label: string;
  href: string;
};

const BreadcrumbContext = createContext<BreadcrumbItem[]>([]);

function BreadcrumbProvider({ items }: { items: BreadcrumbItem[] }) {
  return (
    <BreadcrumbContext.Provider value={items}>
      <Breadcrumb>
        <BreadcrumbList>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem
                className={index !== items.length - 1 ? "hidden md:block" : ""}
              >
                {index !== items.length - 1 ? (
                  <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {index !== items.length - 1 && (
                <BreadcrumbSeparator className="hidden md:block" />
              )}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </BreadcrumbContext.Provider>
  );
}

export { BreadcrumbContext };
export default BreadcrumbProvider;
