import { getOthersCompanyConnections } from "@/api/connection.api";
import { getSearchSuggestions } from "@/api/search.api";
import { useCreateConnection, useRemoveConnection } from "@/hooks/connections/useConnections";
import { useRouter } from "@/i18n/navigation";
import capitalize from "@/lib/capitalize";
import Cookies from "js-cookie";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BsBriefcase } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { toast } from "react-toastify";
import { useSingleCompany } from "../../hooks/company/useSingleCompany";
import { useAcceptConnection } from "../../hooks/user/useNetworkInvites";

const SearchBar = ({ placeholder = "Search..." }) => {
  const router = useRouter();
  const params = useParams();
  const paramsUserId = params?.id;
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState({ users: [], companies: [], jobs: [] });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchContainerRef = useRef(null);
  const userId = params?.id;
  const searchParams = useSearchParams();
  const { mutate: createConnection, isPending: isConnecting } = useCreateConnection();
  const { data: userData, error } = useSingleCompany(userId);
  const [isRemoving, setIsRemoving] = useState(false);
  console.log(searchParams?.get("fromConnections") === "true", "helllloooooooo");

  const [showConnect, setShowConnect] = useState(
    !(searchParams?.get("fromConnections") === "true")
  );
  const { mutate: acceptConnection, isPending } = useAcceptConnection();
  const { mutate: removeConnection } = useRemoveConnection();
  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSuggestions({ users: [], companies: [], jobs: [] });
      return;
    }

    try {
      setIsLoading(true);
      const userId = Cookies.get("userId");
      const userRole = Cookies.get("userRole");
      const response = await getSearchSuggestions({ query: searchQuery, page: 1, userId });
      let companies = response?.success ? response.data.companies || [] : [];
      let users = response?.success ? response.data.users || [] : [];
      // Check connection status for each company
      const companyConnectionChecks = await Promise.all(
        companies.map(async (company) => {
          try {
            const res = await getOthersCompanyConnections({
              userId,
              profileId: company._id,
              userType: capitalize(userRole),
              filterType: "Company",
              page: 1,
              limit: 1,
            });
            // If connection exists, mark as connected
            return { ...company, isConnected: res?.data?.results?.length > 0 };
          } catch {
            return { ...company, isConnected: false };
          }
        })
      );
      // Check connection status for each user
      const userConnectionChecks = await Promise.all(
        users.map(async (user) => {
          try {
            const res = await getOthersUserConnections({
              userId,
              profileId: user._id,
              userType: capitalize(userRole),
              filterType: "User",
              page: 1,
              limit: 1,
            });
            return { ...user, isConnected: res?.data?.results?.length > 0 };
          } catch {
            return { ...user, isConnected: false };
          }
        })
      );
      setSuggestions({
        users: userConnectionChecks,
        companies: companyConnectionChecks,
        jobs: response?.data?.jobs || [],
      });
    } catch (error) {
      console.error("Search error:", error);
      setSuggestions({ users: [], companies: [], jobs: [] });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(true);
  };
  const handleRemoveConnection = () => {
    if (!userData || !paramsUserId) return;

    setIsRemoving(true);

    removeConnection(
      {
        id: paramsUserId,
        role: "Company",
      },
      {
        onSuccess: (res) => {
          if (res.success) {
            // Refresh the page to update the UI
            setShowConnect(true);
          } else {
            toast.error(res?.message || "Failedtoremoveconnection");
          }
        },
        onError: (error) => {
          toast.error(error?.message || "Failedtoremoveconnection");
        },
        onSettled: () => {
          setIsRemoving(false);
        },
      }
    );
  };

  const handleConnect = () => {
    if (!userData || !paramsUserId) return;
    acceptConnection(
      { id: paramsUserId, role: "Company" },
      {
        onSuccess: (res) => {
          if (res.success) {
            setShowConnect(false);
          } else {
            toast.error(res?.message | "Failedtoacceptconnection");
          }
        },
        onError: (error) => {
          toast.error(error?.message || "Failedtoacceptconnection");
        },
      }
    );
  };
  const handleSuggestionClick = (suggestion, type) => {
    const userRole = Cookies.get("userRole");
    const userId = Cookies.get("userId");
    console.log(suggestion, "suggestion.isConnectedsuggestion.isConnectedsuggestion.isConnected");

    switch (type) {
      case "user":
        router.push(
          showConnect
            ? `/single-user/${suggestion._id}?fromConnections=true`
            : `/single-user/${suggestion._id}`
        );
        break;

      case "company":
        router.push(
          showConnect
            ? `/company/single-company/${suggestion._id}`
            : `/company/single-company/${suggestion._id}?fromConnections=true`
        );
        break;

      case "job":
        {
          userRole === "Company"
            ? router.push(`/jobs`)
            : router.push(`/company/single-company/${userId}/applications`);
        }
        break;

      default:
        setSearchQuery("");
    }

    setShowSuggestions(false);
  };

  const renderUserSuggestions = () => {
    return suggestions.users.map((user, index) => (
      <div
        key={user._id || index}
        onClick={() => handleSuggestionClick(user, "user")}
        className="flex cursor-pointer items-center gap-3 px-4 py-2 hover:bg-[#f3f6f8]"
      >
        <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
          {user.profile?.profileImage ? (
            <Image
              src={user.profile.profileImage}
              alt={user.profile.fullName}
              width={32}
              height={32}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#0a66c2] text-white">
              {user.profile?.fullName?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="text-[14px] font-medium text-[#000000]">{user.profile?.fullName}</div>
          {user.profile?.headline && (
            <div className="text-[12px] text-[#666666]">{user.profile.headline}</div>
          )}
        </div>
      </div>
    ));
  };

  const renderCompanySuggestions = () => {
    return suggestions.companies.map((company, index) => (
      <div
        key={company._id || index}
        className="flex items-center gap-3 px-4 py-2 hover:bg-[#f3f6f8]"
      >
        <div className="flex h-8 w-8 items-center justify-center">
          <HiOutlineBuildingOffice2 className="text-xl text-[#666666]" />
        </div>
        <div
          className="flex-1 cursor-pointer"
          onClick={() => handleSuggestionClick(company, "company")}
        >
          <div className="text-[14px] font-medium text-[#000000]">{company.companyName}</div>
          {company.industryType && (
            <div className="text-[12px] text-[#666666]">{company.industryType.join(", ")}</div>
          )}
        </div>
        <div>
          {/* {showConnect ? (
            <button className="connect-btn" onClick={handleConnect}>
              connect
            </button>
          ) : (
            <button
              onClick={handleRemoveConnection}
              disabled={isRemoving}
              className="text-primary border-primary border px-4 py-2 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isRemoving ? "Removing..." : "Remove"}
            </button>
          )} */}
        </div>
      </div>
    ));
  };

  const renderJobSuggestions = () => {
    return suggestions.jobs.map((job, index) => (
      <div
        key={job._id || index}
        onClick={() => handleSuggestionClick(job, "job")}
        className="flex cursor-pointer items-center gap-3 px-4 py-2 hover:bg-[#f3f6f8]"
      >
        <div className="flex h-8 w-8 items-center justify-center">
          <BsBriefcase className="text-xl text-[#666666]" />
        </div>
        <div className="flex-1">
          <div className="text-[14px] font-medium text-[#000000]">{job.jobTitle}</div>
          {job.companyName && <div className="text-[12px] text-[#666666]">{job.companyName}</div>}
        </div>
      </div>
    ));
  };

  return (
    <div className="relative" ref={searchContainerRef}>
      <div className="flex items-center rounded bg-[#132028] focus-within:border-[#fff] focus-within:shadow-[0_0_0_1px_#0a66c2]">
        <div className="flex items-center pl-3">
          <FiSearch className="text-xl text-white" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder}
          className="w-full bg-transparent px-2 py-1.5 text-[13px] font-normal text-white outline-none placeholder:text-white"
        />
      </div>

      {/* Search Suggestions */}
      {showSuggestions && searchQuery.length > 0 && (
        <div className="absolute top-[100%] right-0 left-0 z-50 mt-1 max-h-[400px] overflow-y-auto rounded-[4px] border border-[#e0e0e0] bg-white shadow-lg">
          {isLoading ? (
            <div className="p-3 text-center text-[#666666]">Loading...</div>
          ) : suggestions.users.length > 0 ||
            suggestions.companies.length > 0 ||
            suggestions.jobs.length > 0 ? (
            <div>
              {suggestions.users.length > 0 && (
                <div>
                  <div className="bg-[#f3f6f8] px-4 py-2 text-[12px] font-medium text-[#666666]">
                    People
                  </div>
                  {renderUserSuggestions()}
                </div>
              )}

              {suggestions.companies.length > 0 && (
                <div>
                  <div className="bg-[#f3f6f8] px-4 py-2 text-[12px] font-medium text-[#666666]">
                    Companies
                  </div>
                  {renderCompanySuggestions()}
                </div>
              )}

              {suggestions.jobs.length > 0 && (
                <div>
                  <div className="bg-[#f3f6f8] px-4 py-2 text-[12px] font-medium text-[#666666]">
                    Jobs
                  </div>
                  {renderJobSuggestions()}
                </div>
              )}

              {/* <div className="border-t border-[#e0e0e0] p-3">
                <button
                  onClick={() => setShowSuggestions(false)}
                  className="w-full text-center text-[14px] text-[#0a66c2] hover:underline"
                >
                  See all results
                </button>
              </div> */}
            </div>
          ) : (
            <div className="p-3 text-center text-[#666666]">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
