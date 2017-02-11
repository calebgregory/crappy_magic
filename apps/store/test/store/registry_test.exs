defmodule Store.RegistryTest do
  use ExUnit.Case, async: true
  doctest Store.Registry

  setup do
    {:ok, registry} = Store.Registry.start_link
    {:ok, registry: registry}
  end

  test "spawns bucket", %{registry: registry} do
    assert Store.Registry.lookup(registry, "1") == :error

    :ok = Store.Registry.create(registry, "1")
    assert {:ok, bucket} = Store.Registry.lookup(registry, "1")

    Store.Bucket.put(bucket, "420", %{p: "q", slug: "420"})
    assert Store.Bucket.get(bucket, "420") == %{p: "q", slug: "420"}
  end
end
