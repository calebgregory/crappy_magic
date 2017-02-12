defmodule Store.BucketTest do
  use ExUnit.Case, async: true
  doctest Store.Bucket

  setup context do
    items = %{"420" => %{slug: "420", p: "q"}}
    {:ok, bucket} = Store.Bucket.start_link(context.test, items)
    {:ok, bucket: bucket, items: items}
  end

  test "starts with data from init", %{bucket: bucket, items: items} do
    assert Store.Bucket.get(bucket, "420") == Map.fetch(items, "420")
  end
end
