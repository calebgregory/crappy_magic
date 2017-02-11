defmodule Store.RegistryTest do
  use ExUnit.Case, async: true
  doctest Store.Registry

  setup context do
    {:ok, registry} = Store.Registry.start_link(context.test)
    {:ok, registry: registry}
  end

  test "spawns bucket", %{registry: registry} do
    assert Store.Registry.lookup(registry, "1") == :error

    :ok = Store.Registry.create(registry, "1")
    assert {:ok, bucket} = Store.Registry.lookup(registry, "1")

    Store.Bucket.put(bucket, "420", %{p: "q", slug: "420"})
    assert Store.Bucket.get(bucket, "420") == %{p: "q", slug: "420"}
  end

  test "removes bucket on exit", %{registry: registry} do
    Store.Registry.create(registry, "1")
    {:ok, bucket} = Store.Registry.lookup(registry, "1")
    Agent.stop(bucket)
    assert Store.Registry.lookup(registry, "1") == :error
  end

  test "removes bucket on crash", %{registry: registry} do
    Store.Registry.create(registry, "1")
    {:ok, bucket} = Store.Registry.lookup(registry, "1")

    # Stop the bucket with non-normal reason
    Process.exit(bucket, :shutdown)

    # Wait until bucket is dead
    ref = Process.monitor(bucket)
    assert_receive {:DOWN, ^ref, _, _, _}

    assert Store.Registry.lookup(registry, "1") == :error
  end
end
