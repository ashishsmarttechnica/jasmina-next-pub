"use client";
import React, { useState, useEffect, useRef } from "react";
import PeopleCard from "./PeopleCard";
import CompanyCard from "./CompanyCard";
import useConnectionsStore from "@/store/connections.store";
import { useConnections } from "@/hooks/connections/useConnections";
import useTabUnderlineAnimation from "@/hooks/connections/animation/useTabUnderlineAnimation";
import TabsWithUnderline from "./TabsWithUnderline";
import ConnectionSkeleton from "@/common/skeleton/ConnectionSkeleton";

const ConnectionsContent = () => {
  const peopleRef = useRef(null);
  const companyRef = useRef(null);
  const [activeTab, setActiveTab] = useState("people");
  const [userPage, setUserPage] = useState(1);
  const [companyPage, setCompanyPage] = useState(1);

  const userType = activeTab === "people" ? "User" : "Company";
  const {
    connections: userConnections,
    pagination: userPagination,
    hasMore: userHasMore,
    resetConnections: resetUserConnections,
  } = useConnectionsStore();

  const {
    connections: companyConnections,
    pagination: companyPagination,
    hasMore: companyHasMore,
    resetConnections: resetCompanyConnections,
  } = useConnectionsStore();

  const {
    underlineStyle,
    hoverStyle,
    handleHover,
    handleHoverLeave,
  } = useTabUnderlineAnimation(activeTab, peopleRef, companyRef);

  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
    error: userError,
    refetch: refetchUser,
    isFetching: isUserFetching,
  } = useConnections("User", userPage);

  const {
    data: companyData,
    isLoading: isCompanyLoading,
    isError: isCompanyError,
    error: companyError,
    refetch: refetchCompany,
    isFetching: isCompanyFetching,
  } = useConnections("Company", companyPage);

  const currentConnections = activeTab === "people" ? userConnections : companyConnections;
  const currentPagination = activeTab === "people" ? userPagination : companyPagination;
  const currentHasMore = activeTab === "people" ? userHasMore : companyHasMore;
  const currentData = activeTab === "people" ? userData : companyData;
  const isLoading = activeTab === "people" ? isUserLoading : isCompanyLoading;
  const isError = activeTab === "people" ? isUserError : isCompanyError;
  const error = activeTab === "people" ? userError : companyError;
  const isFetching = activeTab === "people" ? isUserFetching : isCompanyFetching;

  const displayData = currentConnections?.length ? currentConnections : currentData?.connections;

  const isInitialLoad = !currentConnections?.length && (isLoading || !currentData);
  const showLoader = isInitialLoad;
  const noData = !isLoading && !isFetching && currentConnections.length === 0;

  useEffect(() => {
    if (activeTab === "people") {
      setUserPage(1);
      resetUserConnections();
      refetchUser();
    } else {
      setCompanyPage(1);
      resetCompanyConnections();
      refetchCompany();
    }
  }, [activeTab]);

  const loadMore = () => {
    if (activeTab === "people") {
      if (!userPagination || userPage >= userPagination.totalPages) return;
      setUserPage((prev) => prev + 1);
    } else {
      if (!companyPagination || companyPage >= companyPagination.totalPages) return;
      setCompanyPage((prev) => prev + 1);
    }
  };

  if (showLoader) {
    return (
      <div className="bg-white shadow rounded-md">
        <div className="bg-white z-10 opacity-0 invisible absolute ">
          <div className="border-b border-black/10">
            <h2 className="text-xl font-medium py-4 px-4 sm:px-6">
              Connections
            </h2>
          </div>

          <TabsWithUnderline
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            peopleRef={peopleRef}
            companyRef={companyRef}
            hoverStyle={hoverStyle}
            underlineStyle={underlineStyle}
            handleHover={handleHover}
            handleHoverLeave={handleHoverLeave}
          />
        </div>

        <ConnectionSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white shadow rounded-md">
        <div className="bg-white z-10">
          <div className="border-b border-black/10">
            <h2 className="text-xl font-medium py-4 px-4 sm:px-6">
              Connections
            </h2>
          </div>

          <TabsWithUnderline
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            peopleRef={peopleRef}
            companyRef={companyRef}
            hoverStyle={hoverStyle}
            underlineStyle={underlineStyle}
            handleHover={handleHover}
            handleHoverLeave={handleHoverLeave}
          />
        </div>

        <div className="p-4 sm:p-6 text-center text-red-500">
          <p>Error: {error?.message || "Something went wrong"}</p>
          <button
            onClick={() => activeTab === "people" ? refetchUser() : refetchCompany()}
            className="mt-2 px-4 py-2 text-sm text-primary border border-primary rounded hover:bg-primary hover:text-white transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (noData) {
    return (
      <div className="bg-white shadow rounded-md">
        <div className="bg-white z-10">
          <div className="border-b border-black/10">
            <h2 className="text-xl font-medium py-4 px-4 sm:px-6">
              Connections
            </h2>
          </div>

          <TabsWithUnderline
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            peopleRef={peopleRef}
            companyRef={companyRef}
            hoverStyle={hoverStyle}
            underlineStyle={underlineStyle}
            handleHover={handleHover}
            handleHoverLeave={handleHoverLeave}
          />
        </div>

        <div className="p-4 sm:p-6 text-center text-grayBlueText">
          No {activeTab === "people" ? "people" : "companies"} connections found
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-md">
      <div className="bg-white z-10">
        <div className="border-b border-black/10">
          <h2 className="text-xl font-medium py-4 px-4 sm:px-6">Connections</h2>
        </div>

        <TabsWithUnderline
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          peopleRef={peopleRef}
          companyRef={companyRef}
          hoverStyle={hoverStyle}
          underlineStyle={underlineStyle}
          handleHover={handleHover}
          handleHoverLeave={handleHoverLeave}
        />
      </div>

      <div className="p-4 sm:p-6 space-y-4">
        {currentConnections.map((item) =>
          activeTab === "people" ? (
            <PeopleCard key={item._id} person={item} />
          ) : (
            <CompanyCard key={item._id} company={item} />
          )
        )}

        {currentHasMore && (
          <div className="flex justify-center mt-4">
            <button
              onClick={loadMore}
              disabled={isFetching}
              className="px-4 py-2 border rounded text-sm text-primary border-primary hover:bg-primary hover:text-white transition flex items-center gap-2"
            >
              {isFetching ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Loading</span>
                </>
              ) : (
                "Load More"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectionsContent;
