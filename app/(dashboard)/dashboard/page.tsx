"use client";

import { useLanguage } from "@/context/LanguageContext";
import StatCard from "@/components/dashboard/StatCard";
import BlogPostsChart from "@/components/dashboard/BlogPostsChart";
import UserGrowthChart from "@/components/dashboard/UserGrowthChart";
import ContentDistributionChart from "@/components/dashboard/ContentDistributionChart";
import RecentActivity from "@/components/dashboard/RecentActivity";
import QuickActions from "@/components/dashboard/QuickActions";
import { FiFileText, FiUsers, FiMessageCircle, FiFolder, FiTag, FiEye } from "react-icons/fi";

const Page = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          {t("Welcome to Dashboard")}
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          {t("Here's what's happening with your content today")}
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title={t("Total Blogs")}
          value="415"
          icon={<FiFileText />}
          trend={{ value: 12.5, isPositive: true }}
          color="var(--primary)"
        />
        <StatCard
          title={t("Total Users")}
          value="1,248"
          icon={<FiUsers />}
          trend={{ value: 8.2, isPositive: true }}
          color="#fe9f43"
        />
        <StatCard
          title={t("Total Comments")}
          value="3,842"
          icon={<FiMessageCircle />}
          trend={{ value: 5.7, isPositive: true }}
          color="#009688"
        />
        <StatCard
          title={t("Total Categories")}
          value="24"
          icon={<FiFolder />}
          trend={{ value: 2.1, isPositive: false }}
          color="#d63031"
        />
        <StatCard
          title={t("Total Tags")}
          value="156"
          icon={<FiTag />}
          trend={{ value: 15.3, isPositive: true }}
          color="#6c5ce7"
        />
        <StatCard
          title={t("Total Views")}
          value="45.2K"
          icon={<FiEye />}
          trend={{ value: 22.8, isPositive: true }}
          color="#e04f16"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BlogPostsChart />
        <UserGrowthChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ContentDistributionChart />
        </div>
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions />
    </div>
  );
};

export default Page;