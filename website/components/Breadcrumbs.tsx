"use client";
import Link from "next/link";

interface BreadcrumbsProps {
  pathname: string;
  breadcrumbLabels: Record<string, string>;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ pathname, breadcrumbLabels }) => {
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <nav className="mb-1 lg:w-[95%] mx-auto">
      <ol className="flex lg:space-x-2  text-moph txt-breadcumbs">
        <li>
          <Link href="/" className="text-gray-600  hover:text-moph">หน้าแรก</Link>
          <span className="lg:mx-2 mx-1 text-gray-600"><i className="ri-arrow-right-s-line"></i></span>
        </li>
        {pathSegments.map((segment, index) => {
          const href = "/" + pathSegments.slice(0, index + 1).join("/");
          const isLast = index === pathSegments.length - 1;
          return (
            <li key={href} className={isLast ? "font-bold" : ""}>
              {isLast ? (
                breadcrumbLabels[segment] || segment
              ) : (
                <Link href={href} className="text-gray-600 hover:text-moph">
                  {breadcrumbLabels[segment] || segment}
                </Link>
              )}
              {!isLast && <span className="lg:mx-2 mx-1 text-gray-600"><i className="ri-arrow-right-s-line"></i></span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
