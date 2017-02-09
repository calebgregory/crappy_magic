defmodule StoreTest do
  use ExUnit.Case, async: true
  doctest Store

  setup do
    {:ok, bucket} = Store.Bucket.start_link
    {:ok, bucket: bucket}
  end

  test "gives access to storage", %{bucket: bucket} do
    assert Store.Bucket.get(bucket, "12345") != nil
  end
end
