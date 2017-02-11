defmodule Store.BucketTest do
  use ExUnit.Case, async: true
  doctest Store.Bucket

  setup do
    {:ok, bucket} = Store.Bucket.start_link
    {:ok, bucket: bucket}
  end

  test "starts fresh", %{bucket: bucket} do
    assert Store.Bucket.get(bucket, "420") == nil
  end

  test "stores values", %{bucket: bucket} do
    assert Store.Bucket.get(bucket, "420") == nil

    :ok = Store.Bucket.put(bucket, "420", %{p: "q", slug: "420"})
    assert Store.Bucket.get(bucket, "420") == %{p: "q", slug: "420"}
  end
end
