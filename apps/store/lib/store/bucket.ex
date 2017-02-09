defmodule Store.Bucket do
  @moduledoc """
  Stores the Items in memory and provides access to these.
  """

  require CSV

  @doc"""
  Starts a new bucket which holds data populated by the configured csv file.
  """
  def start_link do
    data =
      Application.get_env(:store, :store_csv)
      |> parse_csv
      |> Enum.reduce(%{}, fn(item, acc) -> Map.put(acc, item.slug, item) end)

    Agent.start_link(fn -> data end)
  end

  @doc """
  Gets item at key `slug` in `bucket`.
  """
  def get(bucket, slug) do
    Agent.get(bucket, &Map.get(&1, slug))
  end

  defp headers do
    [
      :slug,
      :title,
      :owner_name,
      :owner_email,
      :video_filename,
      :video_creator_name,
      :video_creator_web_address,
      :video_creator_email,
      :video_creator_instagram_handle,
      :price,
      :description,
      :materials,
      :manufacture_info,
      :mature_content
    ]
  end

  defp parse_csv(file) do
    file
    |> File.stream!
    |> CSV.Decoder.decode(separator: ?|, headers: headers())
  end
end
