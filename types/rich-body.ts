export type RichAsset = {
  sys: { id: string };
  url: string | null;
  contentType: string | null;
  title: string | null;
  description: string | null;
  width: number | null;
  height: number | null;
};

export type RichEntryRef = {
  sys: { id: string };
  __typename: string;
  title?: string | null;
  slug?: string | null;
  reviewerName?: string | null;
  location?: string | null;
};

export type RichBodyLinks = {
  assets?: { block: RichAsset[] };
  entries?: {
    block: RichEntryRef[];
    inline: RichEntryRef[];
  };
};
