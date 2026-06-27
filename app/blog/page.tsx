"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Footer, SubcribeToNewsLetter, CustomLoader } from "@/components/ui";
import BlogFilterBar from "./_components/blog-filter-bar";
import BlogCardBig from "./_components/blog-card-big";
import BlogCardSmall from "./_components/blog-card-small";
import { CATEGORY_MAP, CATEGORY_LABEL, BlogCategory } from "./_components/blog-data";
import { queryGetAllBlogPosts } from "@/queries/blog-query";
import { BlogPostsResponse, CmsBlogPost } from "@/types/blog";

const BIG_CARD_CATEGORIES: BlogCategory[] = [
  "travel-updates",
  "company-updates",
];
const SMALL_CARD_CATEGORIES: BlogCategory[] = ["support", "stories"];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchValue, setSearchValue] = useState("");

  const { data, loading } = useQuery<BlogPostsResponse>(queryGetAllBlogPosts);
  const posts: CmsBlogPost[] = data?.blogPostCollection.items ?? [];

  const filteredPosts = useMemo(() => {
    const categorySlug =
      activeCategory === "All" ? null : CATEGORY_MAP[activeCategory];
    return posts.filter((post) => {
      const matchesCategory = !categorySlug || post.category === categorySlug;
      const matchesSearch =
        !searchValue ||
        post.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchValue.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [posts, activeCategory, searchValue]);

  const featuredPost = posts[0];
  const featuredSmall = posts.slice(1, 4);

  return (
    <main className="flex flex-col min-h-screen bg-[color:var(--bg-primary)]">
      {/* Hero */}
      <section className="relative w-full h-[calc(350px+75px)] sm:h-[calc(460px+95px)] -mt-[75px] sm:-mt-[95px] bg-[#daf3db] dark:bg-[#133114] overflow-hidden flex items-center pt-[75px] sm:pt-[95px]">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 460"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M1222.02 -93H1472.32C1459.4 -83.6528 1357.51 -51.2283 1337.07 -44.3885C1131.09 24.8264 922.897 87.3277 712.852 143.014C622.121 167.042 532.711 186.976 442.387 209.775C440.515 209.627 429.821 208.197 429.067 208.326C387.772 215.334 346.186 226.388 305.326 234.943C173.283 261.985 40.4884 285.197 -92.8969 304.545C-104.688 306.169 -148.659 313.627 -158.463 312.555C-169.514 305.258 -160.108 297.115 -166.047 285.606C-168.479 280.896 -169.691 278.505 -168.592 273.879C-164.248 269.738 -155.597 264.91 -153.35 262.28L-154.767 260.752L-154.354 261.068C-158.919 261.727 -159.09 262.741 -161.385 261.061C-160.902 260.354 -160.496 259.589 -159.939 258.941C-153.265 251.178 -112.024 249.679 -100.805 248.618L-99.824 252.163L-98.9969 251.188L-99.3582 246.85L-101.645 245.615C-113.24 252.478 -121.013 248.053 -133.465 249.032C-141.481 249.662 -150.208 254.534 -158.75 253.273C-159.441 248.083 -158.949 246.078 -158.29 240.986C-121.952 237.182 -82.5964 230.159 -46.4203 224.545C-11.7619 219.166 23.1505 215.128 57.7319 208.709C76.6427 205.199 95.3097 202.213 113.868 197.091C118.723 195.75 130.067 197.239 134.363 195.923C159.291 188.247 185.516 185.363 211.009 180.378C223.381 177.96 229.673 173.47 242.652 175.58C242.701 175.587 264.022 169.632 266.232 169.104L333.098 153.738C338.83 152.384 341.34 154.517 345.983 153.439L533.915 109.252C589.43 95.7653 645.235 80.4326 700.997 67.2562C724.532 61.696 748.415 52.2384 773.242 47.0877C775.447 50.2805 777.188 70.0189 769.788 73.4374C757.252 70.2438 731.134 86.0494 719.047 85.8521C719.367 83.7844 724.053 78.8656 725.794 76.7529L725.62 74.9609C721.166 74.9943 690.448 82.7629 684.876 87.721L703.638 88.0852C703.304 94.6538 655.233 99.622 649.443 100.893C646.89 101.453 651.663 102.247 647.659 106.371C646.179 106.018 644.684 105.667 643.204 105.314C633.294 103.067 611.195 117.906 602.388 116.097C587.646 113.068 593.203 120.976 579.955 123.662C578.2 124 576.836 121.41 574.993 119.319L571.365 119.177C566.548 123.587 564.647 126.763 557.958 125.766C558.582 119.966 559.554 121.795 557.189 118.338L553.083 118.662C546.931 123.504 554.752 119.844 551.298 128.224C544.072 128.532 552.198 127.867 543.332 121.831C535.018 120.687 511.889 126.872 504.968 132.115L505.142 133.668C509.684 135.618 518.085 133.201 524.121 132.515C528.184 135.541 527.865 135.62 532.74 136.643C535.149 135.932 537.383 135.341 539.806 134.724L540.59 130.611C536.484 134.26 534.365 135.372 528.967 133.934L528.3 131.817C533.016 127.851 531.478 129.688 539.037 128.141C535.424 127.847 532.842 127.966 529.62 126.297C544.595 117.224 544.421 127.342 548.585 130.318C557.421 130.093 565.228 125.186 573.136 121.081C577.169 124.02 577.068 123.849 581.856 125.412C585.063 125.083 586.427 124.414 588.647 121.996C596.845 113.06 603.868 119.238 618.987 115.773L621.483 110.8C625.415 110.066 628.97 111.079 633.134 111.7C636.268 109.973 637.603 108.522 640.084 105.934C645.09 106.934 648.863 108.392 653.434 106.527C652.316 105.028 651.199 103.522 650.096 102.01C645.758 104.113 697.166 95.2879 697.979 95.1486C706.598 89.3142 701.679 81.7748 712.547 79.5403C715.55 81.6805 715.492 81.4237 717.001 84.7406L710.864 83.8105C712.59 87.2523 712.373 87.6832 715.463 89.7814C729.306 85.2935 743.032 80.8621 757.078 77.0155C763.027 75.3832 771.936 75.6197 775.592 71.5874C778.349 62.9206 777.464 50.7272 775.97 41.8353C799.679 37.6455 859.532 19.1568 884.199 12.0569C961.218 -10.0979 1037.99 -33.1424 1114.47 -57.072C1129.76 -61.8564 1211.46 -86.6935 1222.02 -93Z"
            className="fill-[#EDFFEE] dark:fill-[#214d22]"
          />
          <path
            d="M17.5027 -122C20.6943 -116.278 19.3041 -94.5171 17.8481 -87.6658C8.27673 -85.6209 -14.153 -84.519 -18.968 -81.868C-22.1769 -84.3429 -21.1838 -82.735 -21.9766 -86.6796C-19.0475 -88.3756 -19.424 -88.2201 -16.1528 -89.4567L-15.5674 -92.6691C-19.2236 -97.049 -16.9369 -95.7675 -22.7399 -96.479C-27.1923 -94.2062 -31.2026 -93.0387 -33.1266 -88.7348C-29.745 -86.0527 -27.7466 -85.7677 -23.6293 -84.4016C-26.3252 -78.4657 -150.932 -66.0238 -167.804 -66.5972C-172.37 -66.7526 -193.81 -62.8736 -196.869 -63.6957C-197.656 -68.5678 -198.003 -66.2725 -195.021 -70.5729C-190.955 -72.597 -188.138 -71.3086 -183.565 -70.2931L-181.246 -72.8734C-189.209 -75.7455 -195.701 -72.0461 -198.865 -64.5523L-197.672 -62.8857C-186.9 -62.3521 -179.791 -62.8875 -169.279 -65.4539C-152.794 -69.4762 -131.516 -65.668 -115.295 -67.5989C-102.348 -69.1394 -87.918 -73.091 -74.5591 -74.8509C-61.5455 -76.5641 -46.0156 -76.2688 -33.7085 -78.2238C-13.1442 -81.4915 -5.08228 -84.5242 16.1349 -85.0734C19.3179 -75.2136 19.5337 -28.339 9.94153 -28.9625C-16.4343 -30.674 -134.608 -9.07867 -151.212 -12.7867C-155.764 -17.4066 -153.904 -21.6259 -153.044 -27.9694L-155.466 -30.6101C-162.731 -30.845 -163.491 -30.3649 -170.609 -28.1749L-171.458 -25.681C-168.084 -21.5758 -165.676 -18.5206 -162.641 -14.1649L-163.766 -11.6227C-175.94 -8.55713 -200.603 -7.91985 -214.176 -6.49328C-246.147 -3.13239 -278.777 -0.869919 -310.819 2.01602C-322.133 3.035 -331.568 -3.80247 -345.492 1.3494C-352.031 3.76903 -362.281 5.74133 -369.307 2.90202C-370.809 -2.83705 -371.861 -6.63487 -373.902 -12.1857L-376.464 -13.5604C-388.18 -8.95087 -382.338 -0.875092 -391.988 6.61005C-439.554 8.28358 -492.003 7.94162 -539.892 12.2006C-549.814 13.0831 -570.058 6.06601 -581.994 8.77406C-610.08 8.88115 -659.799 12.1989 -686.826 8.23524C-687.183 4.73273 -687.698 1.34073 -688.472 -2.09442C-697.601 -5.54339 -712.549 -0.552155 -719.538 -4.98383L-721.934 -3.18591C-721.234 3.11964 -722.542 0.473732 -717.542 4.84323C-710.779 5.81039 -708.121 5.53236 -701.195 5.19731L-701.395 6.31126C-733.616 12.1263 -738.339 12.5546 -770.755 5.39765C-783.445 2.59461 -797.742 12.919 -818.448 6.16963C-821.755 -1.1998 -821.495 -7.2497 -827.082 -13.0475C-832.67 -15.417 -839.116 -16.4084 -844.544 -13.1079C-843.454 -7.6763 -836.142 -2.8923 -831.081 1.69826C-834.235 4.35622 -862.065 0.988434 -868.025 1.05061C-877.272 1.14559 -866.825 7.56169 -877.452 5.80871C-883.277 4.84673 -891.182 -2.05984 -896.987 -1.78351C-914.903 -0.928604 -918.596 4.55137 -936.683 -1.84744C-945.037 -4.80419 -969.807 -0.360435 -979.767 -1.97525C-992.344 -3.06331 -1004.97 -10.4103 -1018 -9.70044C-1025.33 -2.62462 -1025.12 -5.04597 -1026.38 3.05228C-1020.88 15.5718 -1017.47 3.44778 -1020.06 22.639C-1009.16 32.3866 -973.173 24.1675 -961.08 36.9306C-942.105 56.9595 -943.827 59.6243 -915.646 51.7886C-903.916 56.2496 -889.479 63.9852 -878.277 63.5172C-873.355 63.3099 -867.05 63.2495 -863.074 65.7416L-861.036 71.3736C-850.844 73.3304 -844.487 71.8244 -836.055 74.7379C-821.855 79.6428 -805.951 86.3905 -791.614 91.4785C-791.157 91.6409 -784.385 88.8654 -783.178 88.3266C-781.965 91.8723 -782.245 90.9638 -781.913 94.7219C-773.644 96.3488 -778.2 93.6149 -769.565 91.9724C-765.879 99.1795 -767.63 98.7391 -762.061 100.551C-756.085 99.2313 -745.377 95.4974 -741.025 98.3453C-737.894 100.394 -729.832 107.269 -726.669 107.545C-708.546 109.133 -713.16 102.565 -700.748 115.853C-696.34 116.006 -678.342 113.842 -677.626 114.576C-665.03 127.231 -659.735 126.118 -643.183 125.882C-637.839 125.806 -632.796 132.711 -627.244 134.441C-607.182 140.695 -581.051 133.56 -567.723 151.843C-551.252 152.562 -554.401 146.515 -537.899 151.776C-523.465 156.375 -500.191 167.294 -486.174 166.133C-478.304 165.482 -472.864 164.428 -465.529 166.846C-459.681 172.045 -458.173 175.782 -451.982 177.801L-449.706 177.026C-447.592 176.323 -439.416 173.521 -437.559 174.114C-409.435 183.112 -380.859 190.191 -351.872 195.853C-334.029 199.338 -315.679 200.267 -298.878 207.384C-280.782 214.201 -278.483 204.778 -259.206 217.512L-258.244 220.353C-263.637 222.734 -271.948 222.146 -278.121 222.213L-278.763 226.41L-278.269 226.619L-277.207 222.202L-276.433 222.187L-276.207 227.441C-266.658 231.354 -240.607 236.249 -231.569 231.983C-237.622 226.99 -240.039 227.582 -246.653 220.961L-246.81 218.439C-229.626 218.256 -207.364 226.261 -189.035 226.6C-188.197 226.615 -171.108 237.42 -160.591 234.782C-157.106 233.91 -133.843 243.074 -128.62 243.121C-124.722 243.827 -103.876 242.242 -103.253 242.644C-80.9303 257.089 -8.98547 255.464 9.85522 267.086C-0.831909 255.848 -14.8678 260.55 -29.7811 257.447C-54.0378 252.4 -78.545 248.11 -102.86 243.373C-129.825 239.081 -163.027 237.484 -187.831 225.128C-191.423 223.339 -211.466 224.964 -214.711 224.522C-224.878 223.133 -221.623 211.717 -239.978 218.456L-245.954 215.393C-249.973 218.477 -248.622 216.52 -249.956 221.584C-246.558 226.622 -239.351 228.225 -233.324 230.13L-232.617 232.769L-235.762 234.264C-242.904 231.233 -259.543 231.846 -261.083 228.731C-256.325 222.605 -254.847 223.004 -254.974 217.071C-275.765 207.612 -291.749 207.844 -313.565 200.379C-329.781 194.832 -362.34 194.5 -380.474 189.975C-393.918 186.62 -388.925 175.867 -404.263 183.865C-416.497 180.112 -433.177 170.755 -442.353 173.259L-444.934 173.938C-447.376 174.594 -449.572 175.259 -451.973 176.014C-475.068 159.594 -467.829 163.738 -495.437 164.373C-500.069 164.48 -517.961 156.919 -523.807 155.634C-545.306 146.07 -543.254 146.634 -565.927 150.652L-567.523 148.985C-588.181 127.794 -620.302 144.564 -639.535 123.678C-646.616 123.585 -650.723 125.308 -656.806 124.55C-663.949 123.659 -670.256 117.219 -676.41 115.233C-683.018 113.101 -692.843 114.977 -699.649 114.034L-707.86 106.938C-722.961 105.176 -729.821 103.478 -743.526 96.4317C-753.059 97.1208 -760.56 100.549 -765.765 97.2366C-766.727 93.9154 -767.149 90.1193 -769.263 88.2092L-773.404 90.2298L-773.406 89.4889L-777.254 91.7565C-779.414 89.9138 -780.397 89.007 -782.497 86.9466C-786.176 87.9742 -788.355 88.7014 -791.922 90.0692C-799.88 86.4665 -806.447 82.7291 -814.98 81.3198C-833.698 78.2301 -829.216 67.9402 -848.257 73.8105C-853.017 70.517 -852.026 71.1836 -854.875 68.1716C-859.763 63.0094 -881.208 60.9438 -889.325 59.3618C-903.294 56.64 -909.049 51.1565 -919.672 47.6712L-919.696 52.7713C-931.475 55.7781 -943.374 53.8265 -951.973 45.072L-952.415 42.2845C-948.113 40.7422 -950.286 41.2517 -945.911 40.7025C-954.217 34.15 -971.528 35.6163 -976.171 26.3333L-974.837 18.634C-977.607 15.1159 -975.877 16.3836 -979.998 14.7929L-982.673 15.8517L-979.411 14.9726L-982.702 16.7048L-979.124 27.1432C-981.884 29.4506 -998.379 27.8392 -1003.11 27.2071C-1015.99 25.4887 -1019.49 16.6046 -1019.41 6.18002C-1017.95 3.62914 -1018.17 2.46162 -1015.16 1.70516C-1012.27 0.976334 -1013.43 1.14902 -1010.38 1.26991C-643.5 114.696 -268.819 201.156 110.67 259.963C650.118 343.785 1194.18 394.739 1739.82 412.543C1961.16 420.046 2182.59 423.826 2404.05 423.882V518.974C2114.26 519.477 1824.51 512.981 1535.04 499.493C1413.16 493.597 1293.06 484.264 1171.83 477.21C1120.56 477.511 1064.36 466.742 1014.34 465.991L1014.69 470.932L1000.54 469.114C986.552 467.21 986.051 477.894 970.905 475.065L971.785 470.445C968.746 463.703 966.155 468.672 961.302 463.326L974.376 462.843C960.387 461.459 945.776 461.074 932.08 459.34C912.564 456.867 867.073 450.145 849.18 452.114L855.139 453.774L855.709 456.245C849.975 455.852 844.241 455.288 838.525 454.56C835.761 456.584 833.602 458.978 831.34 461.547C826.072 463.043 826.193 462.566 820.822 460.898L823.516 455.52L821.686 453.128C816.573 452.9 815.969 452.902 811.029 451.653L810.857 449.682L823.896 449.791C821.064 446.886 716.904 437.926 704.59 436.603C541.077 418.911 377.928 398.048 215.229 374.026C151.625 364.855 82.4753 351.115 19.8395 343.65L19.8497 608.896C18.2314 525.13 22.2695 438.292 18.6737 354.417C18.4009 348.03 6.98999 345.162 1.6499 344.358C-91.2822 330.405 -184.028 312.413 -276.335 294.394C-423.005 265.079 -568.692 231.049 -713.171 192.36C-730.554 187.652 -751.263 184.644 -768.249 179.853C-781.627 176.079 -794.611 171.668 -808.588 167.851C-870.747 151.242 -932.495 133.137 -993.783 113.554C-1017.1 105.991 -1092.56 86.071 -1109.02 74.9798L-1107.97 70.8037C-1115.19 67.8625 -1125.39 64.8211 -1133 62.2926V-112.56C-750.688 -66.2449 -363.998 -69.4175 17.5027 -122Z"
            className="fill-[#EDFFEE] dark:fill-[#214d22]"
          />
        </svg>
        <div className="relative z-10 px-[100px] max-sm:px-6 flex flex-col gap-4">
          <h1 className="font-ogg-trial text-[52px] max-sm:text-[32px] leading-[78px] max-sm:leading-[48px] text-neutral-text dark:text-foreground">
            Here&apos;s our blog!
          </h1>
          <p className="text-[16px] sm:text-[20px] font-normal leading-[30px] text-neutral-text dark:text-foreground font-plus-jakarta-sans">
            The latest updates from TripCooks and the world of travel
          </p>
        </div>
      </section>

      {/* Filter + Content */}
      <section className="px-[100px] max-sm:px-4 py-[36px] flex flex-col gap-[42px] bg-[color:var(--bg-primary)]">
        <BlogFilterBar
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
        />

        {loading ? (
          <div className="h-[400px] flex items-center justify-center">
            <CustomLoader />
          </div>
        ) : activeCategory === "All" ? (
          <AllView
            posts={posts}
            filteredPosts={filteredPosts}
            searchValue={searchValue}
            featuredPost={featuredPost}
            featuredSmall={featuredSmall}
          />
        ) : (
          <CategoryView
            activeCategory={activeCategory}
            filteredPosts={filteredPosts}
            posts={posts}
          />
        )}
      </section>

      <SubcribeToNewsLetter />
      <Footer />
    </main>
  );
}

/* ─── All view ─────────────────────────────────────────────────── */

function AllView({
  posts,
  filteredPosts,
  searchValue,
  featuredPost,
  featuredSmall,
}: {
  posts: CmsBlogPost[];
  filteredPosts: CmsBlogPost[];
  searchValue: string;
  featuredPost: CmsBlogPost | undefined;
  featuredSmall: CmsBlogPost[];
}) {
  if (searchValue && filteredPosts.length === 0) {
    return (
      <p className="text-[16px] text-[color:var(--text-secondary)] font-plus-jakarta-sans py-10 text-center">
        No posts found for &quot;{searchValue}&quot;
      </p>
    );
  }

  if (searchValue) {
    return (
      <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-5">
        {filteredPosts.map((post) => (
          <BlogCardBig key={post.sys.id} post={post} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[42px]">
      {/* Featured articles */}
      {featuredPost && (
        <div className="flex flex-col gap-5">
          <h2 className="font-ogg-trial text-[42px] max-sm:text-[28px] leading-[60px] max-sm:leading-[40px] text-[color:var(--text-primary)]">
            Featured Articles
          </h2>
          <div className="flex gap-5 max-sm:flex-col">
            <BlogCardBig post={featuredPost} className="sm:w-1/2 max-sm:w-full" />
            <div className="flex flex-col gap-4 flex-1">
              {featuredSmall.map((post) => (
                <BlogCardSmall key={post.sys.id} post={post} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Big-card categories */}
      {BIG_CARD_CATEGORIES.map((cat) => {
        const catPosts = posts.filter((p) => p.category === cat).slice(0, 6);
        if (!catPosts.length) return null;
        return (
          <div key={cat} className="flex flex-col gap-5">
            <hr className="border-0 border-t border-dashed border-[#EEEEEE] dark:border-white/10" />
            <h2 className="font-ogg-trial text-[42px] max-sm:text-[28px] leading-[60px] max-sm:leading-[40px] text-[color:var(--text-primary)]">
              {CATEGORY_LABEL[cat]}
            </h2>
            <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-5">
              {catPosts.map((post) => (
                <BlogCardBig key={post.sys.id} post={post} />
              ))}
            </div>
          </div>
        );
      })}

      {/* Small-card categories */}
      {SMALL_CARD_CATEGORIES.map((cat) => {
        const catPosts = posts.filter((p) => p.category === cat).slice(0, 4);
        if (!catPosts.length) return null;
        return (
          <div key={cat} className="flex flex-col gap-5">
            <hr className="border-0 border-t border-dashed border-[#EEEEEE] dark:border-white/10" />
            <h2 className="font-ogg-trial text-[42px] max-sm:text-[28px] leading-[60px] max-sm:leading-[40px] text-[color:var(--text-primary)]">
              {CATEGORY_LABEL[cat]}
            </h2>
            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-5">
              {catPosts.map((post) => (
                <BlogCardSmall key={post.sys.id} post={post} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Single-category view ──────────────────────────────────────── */

function CategoryView({
  activeCategory,
  filteredPosts,
  posts,
}: {
  activeCategory: string;
  filteredPosts: CmsBlogPost[];
  posts: CmsBlogPost[];
}) {
  const [showMore, setShowMore] = useState(false);
  const PAGE_SIZE = 9;
  const visible = showMore ? filteredPosts : filteredPosts.slice(0, PAGE_SIZE);
  const slug = CATEGORY_MAP[activeCategory] as BlogCategory | undefined;

  const crossCategoryTravel = posts
    .filter((p) => p.category === "travel-updates")
    .slice(0, 3);
  const crossCategoryCompany = posts
    .filter((p) => p.category === "company-updates")
    .slice(0, 3);

  return (
    <div className="flex flex-col gap-[42px]">
      {/* Filtered section */}
      <div className="flex flex-col gap-5">
        <h2 className="font-ogg-trial text-[42px] max-sm:text-[28px] leading-[60px] max-sm:leading-[40px] text-[color:var(--text-primary)]">
          {activeCategory}
        </h2>
        {filteredPosts.length === 0 ? (
          <p className="text-[16px] text-[color:var(--text-secondary)] font-plus-jakarta-sans py-6">
            No posts in this category yet.
          </p>
        ) : (
          <>
            {slug && SMALL_CARD_CATEGORIES.includes(slug) ? (
              <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-5">
                {visible.map((post) => (
                  <BlogCardSmall key={post.sys.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-5">
                {visible.map((post) => (
                  <BlogCardBig key={post.sys.id} post={post} />
                ))}
              </div>
            )}

            {filteredPosts.length > PAGE_SIZE && !showMore && (
              <div className="flex justify-center mt-2">
                <button
                  onClick={() => setShowMore(true)}
                  className="border border-[#09af0d] text-[#09af0d] text-[16px] font-medium font-plus-jakarta-sans px-8 py-3 rounded-full hover:bg-[#09af0d]/5 transition-colors"
                >
                  Show more
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Read more from Trip Cooks cross-section */}
      <div className="flex flex-col gap-[24px]">
        <hr className="border-0 border-t border-dashed border-[#EEEEEE] dark:border-white/10" />
        <div className="flex flex-col gap-4">
          <h2 className="font-ogg-trial text-[42px] max-sm:text-[28px] leading-[60px] max-sm:leading-[40px] text-[color:var(--text-primary)]">
            Read more from Trip Cooks
          </h2>
          <p className="text-[20px] max-sm:text-[16px] font-normal leading-[30px] text-[color:var(--text-secondary)] font-plus-jakarta-sans">
            Explore more stories, insights and updates from the Trip Cooks team
          </p>
        </div>

        {crossCategoryTravel.length > 0 && (
          <div className="flex flex-col gap-5">
            <h3 className="font-ogg-trial text-[32px] max-sm:text-[22px] leading-[48px] text-[color:var(--text-primary)]">
              Travel updates
            </h3>
            <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-5">
              {crossCategoryTravel.map((post) => (
                <BlogCardBig key={post.sys.id} post={post} />
              ))}
            </div>
          </div>
        )}

        {crossCategoryCompany.length > 0 && (
          <div className="flex flex-col gap-5">
            <h3 className="font-ogg-trial text-[32px] max-sm:text-[22px] leading-[48px] text-[color:var(--text-primary)]">
              Company updates
            </h3>
            <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-5">
              {crossCategoryCompany.map((post) => (
                <BlogCardBig key={post.sys.id} post={post} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
